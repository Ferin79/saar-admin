import {
  Create,
  email,
  ImageField,
  ImageInput,
  PasswordInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";
import { uploadFile } from "../../utils/uploadFile";
import { RoleEnum, StatusEnum } from "../../types/User";

export const UserCreate = () => {
  const notify = useNotify();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transform = async (data: Record<string, any>) => {
    const transformedData = { ...data };

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

    return transformedData;
  };

  return (
    <Create mutationMode="pessimistic" redirect="list" transform={transform}>
      <SimpleForm
        defaultValues={{
          provider: "email",
          role: { id: RoleEnum.user },
          status: { id: StatusEnum.active },
        }}
      >
        <TextInput
          type="email"
          source="email"
          validate={[required(), email()]}
          fullWidth
        />
        <PasswordInput source="password" validate={required()} fullWidth />
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
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};
