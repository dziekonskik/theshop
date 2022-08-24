import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { UploadButton } from "../ButtonsAndLinks/UploadButton";

export function isAvatarData(
  response: any
): response is { url: string; width: number; height: number } {
  return (
    response &&
    "url" in response &&
    typeof response.url === "string" &&
    "width" in response &&
    typeof response.width === "number" &&
    "height" in response &&
    typeof response.height === "number"
  );
}

interface UserAvatarProps {
  avatar:
    | {
        __typename?: "Asset" | undefined;
        url: string;
        width?: number | null | undefined;
        height?: number | null | undefined;
      }
    | null
    | undefined;
  displayName: string;
}

export const UserAvatar = ({ avatar, displayName }: UserAvatarProps) => {
  const [temporaryAvatarUrl, setTemporaryAvatarUrl] = useState<
    string | undefined
  >();
  const { data: sessionData } = useSession();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files && e.target.files[0];
    if (!uploadedImage) return;
    const fileBlobUrl = URL.createObjectURL(uploadedImage);
    setTemporaryAvatarUrl(fileBlobUrl);

    const formData = new FormData();
    formData.append("fileUpload", uploadedImage, sessionData?.user.email);

    const response = await fetch("/api/user-photo", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setTemporaryAvatarUrl(undefined);
      throw new Error("Uploading failed");
    }
  };
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    "fileUpload",
    handleFileUpload
  );

  return (
    <article className="flex flex-col ">
      <div className="w-full items-center h-full flex">
        <span
          className="border-[3px] border-midnight rounded-full w-32 h-32 relative overflow-hidden cursor-pointer mx-6"
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {avatar?.url ? (
            <Image
              src={avatar.url}
              width={avatar.width || 500}
              height={avatar.height || 500}
              alt="user avatar photo"
              className="rounded-full w-32 h-32"
            />
          ) : (
            <Image
              src={temporaryAvatarUrl || "/assets/user.svg"}
              layout="fill"
              alt="user avatar photo"
              className="object-cover"
              priority
            />
          )}
        </span>
        <UploadButton
          handleFileUpload={mutate}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
      </div>
      <span className="font-anonymous text-start mt-2 ml-5 text-midnight">
        Hello {displayName}!
      </span>
    </article>
  );
};
