import {
  ArrayField,
  DateField,
  FunctionField,
  ImageField,
  RichTextField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";

export const ChapterTranslationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" label="Title" />
      <RichTextField source="description" label="Description" />
      <FunctionField
        label="Language"
        render={(record) =>
          record?.language
            ? `${record.language.native_name} - ${record.language.name} (${record.language.code})`
            : ""
        }
      />
      <FunctionField
        label="Chapter"
        render={(record) =>
          record?.chapter
            ? `${record.chapter.number}. ${record.chapter.name} (${record.chapter.totalVerses} verses)`
            : ""
        }
      />
      <ArrayField source="chapter.images" label="Chapter Images">
        <SingleFieldList>
          <ImageField source="path" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="id" />
      <DateField source="createdAt" showTime label="Created At" />
      <DateField source="updatedAt" showTime label="Updated At" />
    </SimpleShowLayout>
  </Show>
);
