import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { usePersonData } from "../Dashboard/UserContext";
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

export const UserAvatar = () => {
  const [temporaryAvatarUrl, setTemporaryAvatarUrl] = useState<
    string | undefined
  >();
  const { personDetails, setAvatarDetails } = usePersonData();
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
    const parsedResponse = await response.json();

    if (response.ok && isAvatarData(parsedResponse)) {
      setAvatarDetails(parsedResponse);
    }

    if (!response.ok) {
      setTemporaryAvatarUrl(undefined);
      throw new Error("Uploading failed");
    }
  };
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    "fileUpload",
    handleFileUpload
  );

  const { avatar } = personDetails;
  const displayName = personDetails.address.name || personDetails.email;
  return (
    <article className="flex flex-col ">
      <div className="w-full items-center h-full flex">
        <span
          className="border-[3px] border-midnight rounded-full w-32 h-32 relative overflow-hidden cursor-pointer mx-6"
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {avatar.url ? (
            <Image
              src={avatar.url}
              width={avatar.width}
              height={avatar.height}
              alt="user avatar photo"
              className="rounded-full w-32 h-32"
            />
          ) : (
            <Image
              src={temporaryAvatarUrl || "/assets/user.svg"}
              layout="fill"
              alt="user avatar photo"
              className="object-cover"
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
      <span className="font-anonymous text-start mt-2 ml-5">
        Hello {displayName}!
      </span>
    </article>
  );
};
