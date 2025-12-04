import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import Dashboard from "./dashboard/Dashboard";
import { UserList, UserCreate, UserEdit } from "./resources/users";
import { CategoryList, CategoryCreate, CategoryEdit } from "./resources/categories";
import { ExpenseList, ExpenseCreate, ExpenseEdit } from "./resources/expenses";

const dataProvider = simpleRestProvider("http://localhost:8080/api");

function App() {
  return (
    <Admin dashboard={Dashboard} dataProvider={dataProvider}>
      <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} />
      <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} />
      <Resource name="expenses" list={ExpenseList} create={ExpenseCreate} edit={ExpenseEdit} />
    </Admin>
  );
}

export default App;