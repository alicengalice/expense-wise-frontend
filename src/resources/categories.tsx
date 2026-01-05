import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
} from "react-admin";

// Filters
const CategoryFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
];

export const CategoryList = () => (
  <List filters={CategoryFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" sortable={false} />
      <TextField source="name" sortable={true} />
      <TextField source="description" sortable={true} />
    </Datagrid>
  </List>
);

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);