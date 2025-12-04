import { useState } from "react";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  const [page, setPage] = useState("users");

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>ExpenseWise Frontend</h1>

      <nav style={{ marginBottom: 24 }}>
        <button onClick={() => setPage("users")}>Users</button>
        <button onClick={() => setPage("categories")} style={{ marginLeft: 16 }}>
          Categories
        </button>
        <button onClick={() => setPage("expenses")} style={{ marginLeft: 16 }}>
          Expenses
        </button>
      </nav>

      {page === "users" && <UsersPage />}
      {page === "categories" && <CategoriesPage />}
      {page === "expenses" && <ExpensesPage />}
    </div>
  );
}

export default App;
