import CryptoJS from "crypto-js";
import { environment } from "../../config/index";

export function ensureVariableIsSet(
  variable: string | undefined,
  name: string
): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
}

export function encryptToken(token: string): string {
  return CryptoJS.AES.encrypt(
    token,
    environment.SECRET_KEY as string
  ).toString();
}

export function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(
    encryptedToken,
    environment.SECRET_KEY as string
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const transformPluralToSingular = (plural: string) => {
  switch (plural) {
    case "categories":
      return "category";
    case "tags":
      return "tag";
    case "recipes":
      return "recipe";
    default:
      return plural.replace(/s$/, "");
  }
};

export const convertToWebP = async (file: File) => {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".webp"),
              {
                type: "image/webp",
              }
            );
            resolve(newFile);
          } else {
            reject(new Error("Could not convert image to WebP"));
          }
        }, "image/webp");
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};