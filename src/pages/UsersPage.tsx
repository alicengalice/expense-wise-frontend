import { useEffect, useState } from "react";
import api from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const createUser = async () => {
    await api.post("/users", { username });
    setUsername("");
    loadUsers();
  };

  const deleteUser = async (id: number) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="New Username"
      />
      <button onClick={createUser}>Add</button>

      <ul>
        {users.map((u: any) => (
          <li key={u.id}>
            {u.username}{" "}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}