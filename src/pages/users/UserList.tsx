import {
  Datagrid,
  DateField,
  EditButton,
  EmailField,
  ImageField,
  List,
  NumberField,
  TextField,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="firstName" />
      <TextField source="lastName" />
      <NumberField source="role.name" />
      <ImageField source="photo.path" label="Photo" />
      <TextField source="provider" />
      <TextField source="socialId" />
      <NumberField source="status.name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="deletedAt" />
      <EditButton />
    </Datagrid>
  </List>
);
