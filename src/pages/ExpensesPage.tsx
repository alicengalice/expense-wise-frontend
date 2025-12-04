import { useEffect, useState } from "react";
import api from "../api";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  const loadUsers = async () => {
    setUsers((await api.get("/users")).data);
  };

  const loadCategories = async () => {
    setCategories((await api.get("/categories")).data);
  };

  const createExpense = async () => {
    await api.post("/expenses", {
      amount: parseFloat(amount),
      description,
      userId: Number(userId),
      categoryId: Number(categoryId),
    });

    setAmount("");
    setDescription("");
    setUserId("");
    setCategoryId("");

    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
    loadUsers();
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>

      <div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={createExpense}>Add Expense</button>
      </div>

      <ul>
        {expenses.map((e: any) => (
          <li key={e.id}>
            ${e.amount} – {e.description} (User {e.userId}, Category{" "}
            {e.categoryId})
          </li>
        ))}
      </ul>
    </div>
  );
}