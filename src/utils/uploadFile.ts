import { NotificationOptions } from "react-admin";
import { AUTH_KEY, BACKEND_URL } from "../constant";
import { AuthResponse } from "../types/Auth";

export type FileUploadResponse = {
  file: {
    id: string;
    path: string;
  };
};

/**
 * Uploads a file to the server
 * @param rawFile File to upload
 * @param notify Notification function from react-admin
 * @returns FileUploadResponse or null if upload fails
 */
export const uploadFile = async (
  rawFile: File,
  notify: (message: string, options?: NotificationOptions) => void,
): Promise<FileUploadResponse | null> => {
  const formData = new FormData();
  formData.append("file", rawFile);

  // Get auth token
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) {
    notify("Authentication error", { type: "error" });
    return null;
  }

  const auth = JSON.parse(authData) as AuthResponse;

  try {
    // Upload the file
    const response = await fetch(`${BACKEND_URL}/files/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    // Return uploaded file data
    return await response.json();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "File upload failed";
    notify(message, { type: "error" });
    return null;
  }
};
