import axios from "axios";
import { environment } from "../../config";
import { decryptToken } from "../../utils/functions";
import { ICategoryImageData, ImageType, IRecipeImageData } from "../../utils/interfaces";

const BASE_URL = environment.IMAGE_API_URL;

async function uploadImage(
  formData: ICategoryImageData | IRecipeImageData,
  type: ImageType,
  method: "post" | "put",
  refId?: string
) {
  const url: string = method === "put" ? `/${type}-images/${refId}` : `/${type}-images`;
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  return axios({
    method: method,
    url: `${BASE_URL}${url}`,
    data: formData,
    headers: { "Content-Type": "application/jos",  "Authorization": "Bearer " + authToken},
  });
}

async function getImage(type: ImageType, refId?: string) {
  const url: string = refId ? `/${type}-images/${refId}` : `/${type}-images`;
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  return axios({
    method: "get",
    url: `${BASE_URL}${url}`,
    headers: { "Authorization": "Bearer " + authToken}
  });
}

async function deleteImage(type: ImageType, refId?: string) {
  const url: string = refId ? `/${type}-images/${refId}` : `/${type}-images`;
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  return axios({
    method: "delete",
    url: `${BASE_URL}${url}`,
    headers: { "Authorization": "Bearer " + authToken}
  });
}

export { uploadImage, getImage, deleteImage };
