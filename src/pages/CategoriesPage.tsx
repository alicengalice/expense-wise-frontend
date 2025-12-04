import { useEffect, useState } from "react";
import api from "../api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const createCategory = async () => {
    await api.post("/categories", { name });
    setName("");
    loadCategories();
  };

  const deleteCategory = async (id: number) => {
    await api.delete(`/categories/${id}`);
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={createCategory}>Add</button>

      <ul>
        {categories.map((c: any) => (
          <li key={c.id}>
            {c.name}{" "}
            <button onClick={() => deleteCategory(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}