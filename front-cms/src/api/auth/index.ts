import axios from "axios";
import { environment } from "../../config"; // Adjust the import path as necessary

export async function authenticateUser(
  email: string,
  password: string
): Promise<string| null> {
  try {
    const { data } = await axios.post(`${environment.AUTH_API_URL}/login`, {
      email,
      password,
    });
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}
