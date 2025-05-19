import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
} from "react-admin";

export const LanguageList = () => (
  <List>
    <Datagrid>
      <TextField source="native_name" />
      <TextField source="name" />
      <TextField source="code" />
      <BooleanField source="is_active" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
);
