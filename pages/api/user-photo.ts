import { NextApiHandler } from "next";
import formidable, { File } from "formidable";
import {
  connectUploadedPhotoToUser,
  checkIfPersonHasAvatarByEmail,
  removePersonsAvatarByAvatarId,
  resizeAndUploadImage,
  isStringIdInUpload,
  isTypeOfFile,
} from "../../util/dashboardHelpers/photoUploadHelpers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const assetUploadHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").json({});
  }

  const formApi = new formidable.IncomingForm({
    allowEmptyFiles: false,
    multiples: false,
  });

  const fileToUpload = await new Promise((resolve, reject) => {
    let parsedFile: File;
    formApi.parse(req);
    formApi.on("file", (formname, file) => {
      parsedFile = file;
    });
    formApi.once("end", () => resolve(parsedFile));
    formApi.once("error", (error) => reject(error));
  }).catch(() => res.status(400).json({ error: "Parsing error" }));

  if (!isTypeOfFile(fileToUpload)) {
    return res.status(400).json({ error: "Unsupported data format" });
  }

  const { originalFilename: userEmail } = fileToUpload;
  if (!userEmail) {
    return res.status(400).json({ error: "Nothing to parse" });
  }

  const uploadResult = await resizeAndUploadImage(fileToUpload, userEmail);

  if (!isStringIdInUpload(uploadResult)) {
    return res.status(400).json({ error: "Parsing error" });
  }

  try {
    const { data } = await checkIfPersonHasAvatarByEmail(userEmail);
    const currentAvatarId = data?.person?.avatar?.id;
    if (currentAvatarId) {
      await removePersonsAvatarByAvatarId(currentAvatarId);
    }
    const { data: avatarData } = await connectUploadedPhotoToUser(
      uploadResult.id,
      userEmail
    );
    const avatar = avatarData?.updatePerson?.avatar;
    return res
      .status(200)
      .json({ url: avatar?.url, width: avatar?.width, height: avatar?.height });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export default assetUploadHandler;
