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
import { uploadFile } from "../../utils/uploadFile";
import { RoleEnum, StatusEnum } from "../../types/User";

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
        const uploadedFile = await uploadFile(values.photo.rawFile, notify);

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
