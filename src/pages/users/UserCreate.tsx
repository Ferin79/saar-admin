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
  useCreate,
  useNotify,
  useRedirect,
} from "react-admin";
import { uploadFile } from "../../utils/uploadFile";
import { RoleEnum, StatusEnum } from "../../types/User";

export const UserCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      let userData = { ...values };

      // If there's a photo to upload
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

      // Create the user with the prepared data
      await create(
        "users",
        { data: userData },
        {
          onSuccess: () => {
            notify("User created successfully", { type: "success" });
            redirect("list", "users");
          },
          onError: (error: unknown) => {
            const message =
              error instanceof Error ? error.message : "Failed to create user";
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
    <Create>
      <SimpleForm
        onSubmit={handleSubmit}
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
