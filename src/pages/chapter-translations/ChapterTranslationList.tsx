import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
} from "react-admin";

export const ChapterTranslationList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="title" label="Title" />
      <TextField source="description" label="Description" />

      <FunctionField
        label="Language"
        render={(record) =>
          record?.language ? (
            <a
              href={`#/languages/${record.language.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {`${record.language.name} (${record.language.code})`}
            </a>
          ) : (
            ""
          )
        }
      />
      <FunctionField
        label="Chapter"
        render={(record) =>
          record?.chapter ? (
            <a
              href={`#/chapters/${record.chapter.id}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {`${record.chapter.number}. ${record.chapter.name}`}
            </a>
          ) : (
            ""
          )
        }
      />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </Datagrid>
  </List>
);
