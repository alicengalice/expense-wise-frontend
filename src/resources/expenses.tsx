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
      <TextField source="id" sortable={false} />
      <TextField source="description" sortable={true} />
      <TextField source="amount" sortable={true} />
      <TextField source="date" sortable={true} />
      <TextField source="category.name" label="Category" sortable={true} />
      <TextField source="user.username" label="User" sortable={true} />
    </Datagrid>
  </List>
);

export const ExpenseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="description" validate={[required()]} />
      <NumberInput source="amount" validate={[required()]} />
      <DateInput source="date" validate={[required()]} />
      <ReferenceInput source="category.id" reference="categories">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="user.id" reference="users">
        <SelectInput optionText="username" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ExpenseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="description" validate={[required()]} />
      <NumberInput source="amount" validate={[required()]} />
      <DateInput source="date" validate={[required()]} />
      <ReferenceInput source="category.id" reference="categories">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="user.id" reference="users">
        <SelectInput optionText="username" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);