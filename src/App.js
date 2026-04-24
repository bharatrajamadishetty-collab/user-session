import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>User Details</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>User ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Username</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Expires At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId ?? index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.userId}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.userName}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.expiresAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;