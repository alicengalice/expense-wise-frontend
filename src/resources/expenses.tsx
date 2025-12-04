import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  NumberInput,
  required,
  ReferenceInput,
  SelectInput,
  DateInput,
} from "react-admin";

const ExpenseFilters = [
  <TextInput label="Search description" source="q" alwaysOn />,
];

export const ExpenseList = () => (
  <List filters={ExpenseFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="description" />
      <TextField source="amount" />
      <TextField source="date" />
      <TextField source="category.name" label="Category" />
      <TextField source="user.username" label="User" />
    </Datagrid>
  </List>
);

export const ExpenseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="description" validate={required()} />
      <NumberInput source="amount" validate={required()} />
      <DateInput source="date" />

      <ReferenceInput label="Category" source="category.id" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceInput label="User" source="user.id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ExpenseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="description" validate={required()} />
      <NumberInput source="amount" validate={required()} />
      <DateInput source="date" />

      <ReferenceInput label="Category" source="category.id" reference="categories">
        <SelectInput optionText="name" />
      </ReferenceInput>

      <ReferenceInput label="User" source="user.id" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);