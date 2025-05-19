import {
  DateField,
  Edit,
  email,
  ImageField,
  ImageInput,
  PasswordInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRecordContext,
  useRedirect,
  useUpdate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { AUTH_KEY, BACKEND_URL } from "../../constant";
import { AuthResponse } from "../../types/Auth";

enum RoleEnum {
  admin = 1,
  user = 2,
}

enum StatusEnum {
  active = 1,
  inactive = 2,
}

type FileUploadResponse = {
  file: {
    id: string;
    path: string;
  };
};

const UserTitle = () => {
  const record = useRecordContext();
  if (!record) return "Edit User";
  return `Edit User: ${record.firstName} ${record.lastName}`;
};

export const UserEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [update] = useUpdate();
  const { id } = useParams<{ id: string }>();

  // Handle file upload
  const uploadFile = async (
    rawFile: File,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      // Use the ID from URL parameters rather than from form values
      const userId = id;

      if (!userId) {
        notify("Error: Missing user ID", { type: "error" });
        return;
      }

      let userData = { ...values };

      // If there's a new photo to upload
      if (values.photo && values.photo.rawFile) {
        const uploadedFile = await uploadFile(values.photo.rawFile);

        if (!uploadedFile || !uploadedFile.file) {
          return; // Upload failed, stop the submission
        }

        // Replace the photo field with the uploaded file info
        userData = {
          ...userData,
          photo: uploadedFile.file,
        };
      }

      // remove password if not updated
      if (!userData.password) {
        delete userData.password;
      }

      delete userData.email;

      // Update the user with the prepared data
      await update(
        "users",
        { id: userId, data: userData },
        {
          onSuccess: () => {
            notify("User updated successfully", { type: "success" });
            redirect("list", "users");
          },
          onError: (error: unknown) => {
            const message =
              error instanceof Error ? error.message : "Failed to update user";
            console.log("error", error);

            notify(message, { type: "error" });
          },
        },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      notify(message, { type: "error" });
    }
  };

  return (
    <Edit title={<UserTitle />} mutationMode="pessimistic">
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="id" disabled />
        <TextInput
          type="email"
          source="email"
          validate={[required(), email()]}
          fullWidth
        />
        <PasswordInput source="password" fullWidth />
        <TextInput source="firstName" validate={required()} fullWidth />
        <TextInput source="lastName" validate={required()} fullWidth />
        <SelectInput
          source="provider"
          choices={[{ id: "email", name: "Email" }]}
          fullWidth
        />
        <SelectInput
          source="role.id"
          choices={[
            { id: RoleEnum.admin, name: "Admin" },
            { id: RoleEnum.user, name: "User" },
          ]}
          validate={required()}
          fullWidth
        />
        <SelectInput
          source="status.id"
          choices={[
            { id: StatusEnum.active, name: "Active" },
            { id: StatusEnum.inactive, name: "Inactive" },
          ]}
          validate={required()}
          fullWidth
        />
        <ImageInput source="photo" label="User Photo">
          <ImageField source="path" title="title" />
          <ImageField source="src" title="title" />
        </ImageInput>

        <DateField source="createdAt" showTime label="Created At" />
        <DateField source="updatedAt" showTime label="Last Updated" />
      </SimpleForm>
    </Edit>
  );
};
