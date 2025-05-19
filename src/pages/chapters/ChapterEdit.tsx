import {
  ArrayInput,
  DateField,
  Edit,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useNotify,
  useRecordContext,
} from "react-admin";
import { FileUploadResponse, uploadFile } from "../../utils/uploadFile";

const ChapterTitle = () => {
  const record = useRecordContext();
  if (!record) return "Edit Chapter";
  return `Edit Chapter: ${record.number} - ${record.name}`;
};

export const ChapterEdit = () => {
  const notify = useNotify();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transform = async (data: any, { previousData }: any) => {
    const transformedData = { ...data };

    const newImages = previousData.images as FileUploadResponse["file"][];

    if (data.images && Array.isArray(data.images)) {
      try {
        for (const image of data.images) {
          if (image && image.rawFile) {
            const uploadedFile = await uploadFile(image.rawFile, notify);

            if (uploadedFile && uploadedFile.file) {
              newImages.push(uploadedFile.file);
            } else {
              notify("Failed to upload image", { type: "error" });
              throw new Error("Failed to upload image");
            }
          }
        }
      } catch (error) {
        notify("Error uploading images", { type: "error" });
        throw error;
      }
    }

    transformedData.images = newImages;

    return transformedData;
  };

  return (
    <Edit
      title={<ChapterTitle />}
      mutationMode="pessimistic"
      redirect="list"
      transform={transform}
    >
      <SimpleForm>
        <TextInput source="id" disabled label="ID" />
        <NumberInput
          source="number"
          validate={required()}
          label="Chapter Number"
          fullWidth
        />
        <TextInput
          source="name"
          validate={required()}
          label="Chapter Name"
          fullWidth
        />
        <NumberInput
          source="totalVerses"
          validate={required()}
          label="Total Verses"
          fullWidth
        />

        <ArrayInput source="images" label="Chapter Images">
          <SimpleFormIterator>
            <ImageField source="path" label="Current Image" />
            <ImageInput source="." label="Update Image">
              <ImageField source="src" title="title" />
            </ImageInput>
          </SimpleFormIterator>
        </ArrayInput>

        <DateField source="createdAt" showTime label="Created At" />
        <DateField source="updatedAt" showTime label="Last Updated" />
      </SimpleForm>
    </Edit>
  );
};
