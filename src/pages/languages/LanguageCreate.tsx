import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  required,
  minLength,
} from "react-admin";

export const LanguageCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="native_name"
        validate={[required(), minLength(2)]}
        fullWidth
      />
      <TextInput
        source="name"
        validate={[required(), minLength(2)]}
        fullWidth
      />
      <TextInput
        source="code"
        validate={[required(), minLength(2)]}
        helperText="Language code (e.g. 'en', 'es', 'fr')"
      />
      <BooleanInput source="is_active" defaultValue={true} />
    </SimpleForm>
  </Create>
);
