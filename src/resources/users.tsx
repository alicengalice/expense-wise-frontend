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

const UserFilters = [
  <TextInput label="Search" source="q" alwaysOn />,
];

export const UserList = () => (
  <List filters={UserFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" sortable={false} />
      <TextField source="username" sortable={true} />
      <TextField source="email" sortable={true} />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
    </SimpleForm>
  </Create>
);