import { Admin, Resource, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { createTransformedFetch } from "./utils/paramTransformer";

import Dashboard from "./dashboard/Dashboard";
import { UserList, UserCreate, UserEdit } from "./resources/users";
import { CategoryList, CategoryCreate, CategoryEdit } from "./resources/categories";
import { ExpenseList, ExpenseCreate, ExpenseEdit } from "./resources/expenses";

// Custom fetch that transforms JSON:API params to simple REST format
const transformedFetch = createTransformedFetch(fetchUtils.fetchJson);

const dataProvider = simpleRestProvider("http://localhost:8080/api", transformedFetch);

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