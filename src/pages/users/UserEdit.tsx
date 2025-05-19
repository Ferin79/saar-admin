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
} from "react-admin";
import { uploadFile } from "../../utils/uploadFile";
import { RoleEnum, StatusEnum } from "../../types/User";

const UserTitle = () => {
  const record = useRecordContext();
  if (!record) return "Edit User";
  return `Edit User: ${record.firstName} ${record.lastName}`;
};

export const UserEdit = () => {
  const notify = useNotify();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transform = async (data: Record<string, any>) => {
    // Create a copy of the data
    const transformedData = { ...data };

    // Handle photo upload if there's a new file
    if (data.photo && data.photo.rawFile) {
      try {
        const uploadedFile = await uploadFile(data.photo.rawFile, notify);

        if (uploadedFile && uploadedFile.file) {
          transformedData.photo = uploadedFile.file;
        } else {
          notify("Failed to upload photo", { type: "error" });
          throw new Error("Failed to upload photo");
        }
      } catch (error) {
        notify("Error uploading file", { type: "error" });
        throw error;
      }
    }

    // Remove password if it's empty
    if (!transformedData.password) {
      delete transformedData.password;
    }

    // Don't send email to API
    delete transformedData.email;

    return transformedData;
  };

  return (
    <Edit
      title={<UserTitle />}
      mutationMode="pessimistic"
      redirect="list"
      transform={transform}
    >
      <SimpleForm>
        <TextInput source="id" disabled label="ID" />
        <TextInput
          type="email"
          source="email"
          disabled
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
        <ImageField source="photo.path" label="Current Photo" />

        <ImageInput source="photo" label="Update Photo">
          <ImageField source="src" title="title" />
        </ImageInput>

        <DateField source="createdAt" showTime label="Created At" />
        <DateField source="updatedAt" showTime label="Last Updated" />
      </SimpleForm>
    </Edit>
  );
};
