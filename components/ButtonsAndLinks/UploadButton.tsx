import { CubeTransparentIcon } from "../Svg";
import { UseMutateFunction } from "react-query";

interface UploadButtonProps {
  handleFileUpload: UseMutateFunction<
    void,
    unknown,
    React.ChangeEvent<HTMLInputElement>,
    unknown
  >;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const UploadButton = (props: UploadButtonProps) => {
  const { handleFileUpload, isLoading, isError, isSuccess } = props;

  const conditionalBackgroundColor = isSuccess
    ? "#BDF298"
    : isError
    ? "#FFB6B6"
    : "#77aaFF";
  const conditionalButtonText = isSuccess
    ? "Success!"
    : isError
    ? "Try again"
    : "Upload photo";

  return (
    <div
      className="h-10 w-40 shadow-lg hover:shadow-md transition-shadow font-anonymous flex justify-center items-center relative px-3"
      style={{ backgroundColor: conditionalBackgroundColor }}
    >
      <input
        type="file"
        style={{
          opacity: 0,
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        onChange={handleFileUpload}
      />
      {isLoading ? (
        <CubeTransparentIcon className="animate-spin" />
      ) : (
        <span className="w-full h-full flex justify-center items-center">
          {conditionalButtonText}
        </span>
      )}
    </div>
  );
};
