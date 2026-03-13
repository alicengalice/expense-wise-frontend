import { Admin, Resource, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { createTransformedFetch } from "./utils/paramTransformer";
import authProvider from "./auth/authProvider"; 

import Dashboard from "./dashboard/Dashboard";
import { UserList, UserCreate, UserEdit } from "./resources/users";
import { CategoryList, CategoryCreate, CategoryEdit } from "./resources/categories";
import { ExpenseList, ExpenseCreate, ExpenseEdit } from "./resources/expenses";
import { ExpenseSummaryPage } from "./resources/expense-summary";

import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";

// Attach JWT token to every react-admin data request
const httpClient = (url: RequestInfo, options: any = {}) => {
  const token = localStorage.getItem("auth_token");
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url as string, { ...options, headers });
};

// Custom fetch that transforms JSON:API params to simple REST format
const transformedFetch = createTransformedFetch(httpClient);
const dataProvider = simpleRestProvider("http://localhost:8080/api", transformedFetch);

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
      <Resource 
        name="users" 
        list={UserList} 
        edit={UserEdit} 
        create={UserCreate}
        icon={PeopleIcon}
      />
      <Resource 
        name="categories" 
        list={CategoryList} 
        edit={CategoryEdit} 
        create={CategoryCreate}
        icon={CategoryIcon}
      />
      <Resource 
        name="expenses" 
        list={ExpenseList} 
        edit={ExpenseEdit} 
        create={ExpenseCreate}
        icon={ReceiptIcon}
      />
      <Resource 
        name="expense-summary" 
        list={ExpenseSummaryPage}
        icon={AssessmentIcon}
        options={{ label: 'Expense Summary' }}
      />
    </Admin>
  );
}

export default App;