import {
  Datagrid,
  DateField,
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
      <ImageField source="photo.path" />
      <TextField source="provider" />
      <TextField source="socialId" />
      <NumberField source="role.name" />
      <NumberField source="status.name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <TextField source="deletedAt" />
    </Datagrid>
  </List>
);
