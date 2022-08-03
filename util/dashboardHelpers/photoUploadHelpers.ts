import sharp from "sharp";
import { File } from "formidable";
import FormData from "form-data";
import fetch from "node-fetch";
import { personAuthApolloClient } from "../../graphql/apolloClient";
import {
  ConnectAvatarIdToPersonEmailDocument,
  ConnectAvatarIdToPersonEmailMutation,
  ConnectAvatarIdToPersonEmailMutationVariables,
  GetPersonAvatarIdByEmailDocument,
  GetPersonAvatarIdByEmailQuery,
  GetPersonAvatarIdByEmailQueryVariables,
  DeletePersonAvatarByAvatarIdDocument,
  DeletePersonAvatarByAvatarIdMutation,
  DeletePersonAvatarByAvatarIdMutationVariables,
} from "../../generated/graphql";

export async function connectUploadedPhotoToUser(
  newPhotoId: string,
  personEmail: string
) {
  return await personAuthApolloClient.mutate<
    ConnectAvatarIdToPersonEmailMutation,
    ConnectAvatarIdToPersonEmailMutationVariables
  >({
    mutation: ConnectAvatarIdToPersonEmailDocument,
    variables: {
      id: newPhotoId,
      email: personEmail,
    },
  });
}

export async function checkIfPersonHasAvatarByEmail(email: string) {
  return await personAuthApolloClient.mutate<
    GetPersonAvatarIdByEmailQuery,
    GetPersonAvatarIdByEmailQueryVariables
  >({
    mutation: GetPersonAvatarIdByEmailDocument,
    variables: { email },
  });
}

export async function removePersonsAvatarByAvatarId(avatarId: string) {
  return await personAuthApolloClient.mutate<
    DeletePersonAvatarByAvatarIdMutation,
    DeletePersonAvatarByAvatarIdMutationVariables
  >({
    mutation: DeletePersonAvatarByAvatarIdDocument,
    variables: { id: avatarId },
  });
}

export async function resizeAndUploadImage(
  fileToUpload: File,
  userEmail: string
) {
  const resizedFileBuffer = await sharp(fileToUpload.filepath)
    .withMetadata()
    .webp()
    .resize({ width: 500, height: 500, fit: "cover" })
    .toBuffer();

  const form = new FormData();
  form.append("fileUpload", resizedFileBuffer, `${userEmail}.webp`);

  return await fetch(`${process.env.HYGRAPH_CONTENT_API}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_ASSET_TOKEN}`,
    },
    body: form,
  }).then((response) => response.json());
}

export function isStringIdInUpload(upload: any): upload is { id: string } {
  return upload && "id" in upload && typeof upload.id === "string";
}

export function isTypeOfFile(formResult: any): formResult is File {
  return (
    formResult &&
    "originalFilename" in formResult &&
    typeof formResult.originalFilename === "string" &&
    "size" in formResult &&
    typeof formResult.size === "number"
  );
}
