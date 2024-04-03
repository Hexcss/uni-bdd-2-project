import axios from "axios";
import { environment } from "../../config"; // Adjust the import path as necessary
import { ICategory, IRecipe, ITag } from "../../utils/interfaces";
import { decryptToken } from "../../utils/functions/index";

export async function getData(
  type: string
): Promise<ITag[] | ICategory[] | IRecipe[] | null> {
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  try {
    const { data } = await axios.get(`${environment.CRUD_API_URL}/${type}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function getSingleData(
  type: string,
  id: string
): Promise<ITag | ICategory | IRecipe | null> {
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  try {
    const { data } = await axios.get(`${environment.CRUD_API_URL}/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    delete data.__v;
    delete data._id;
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function postData(
  body: ITag | ICategory | IRecipe,
  type: string
): Promise<boolean | null> {
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : ""

  try {
    await axios.post(`${environment.CRUD_API_URL}/${type}`, body, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function deleteData(
  id: string,
  type: string
): Promise<boolean | null> {
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  try {
    await axios.delete(`${environment.CRUD_API_URL}/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}

export async function updateData(
  body: ITag | ICategory | IRecipe,
  type: string
): Promise<boolean | null> {
  const encryptedToken = localStorage.getItem("token");
  const authToken = encryptedToken ? decryptToken(encryptedToken) : "";

  try {
    await axios.put(`${environment.CRUD_API_URL}/${type}/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}