import {
  ArrayField,
  Datagrid,
  DateField,
  ImageField,
  List,
  NumberField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const ChapterList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="number" />
      <TextField source="name" />
      <NumberField source="totalVerses" />
      <ArrayField source="images">
        <SingleFieldList>
          <ImageField source="path" />
        </SingleFieldList>
      </ArrayField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);
