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
      <h1>Click the button below to get all the available users list</h1>,
      <button
        style={{ padding: "10px", margin: "10px" }}
        onClick={() => {
          if (!users || users.length === 0) {
            alert("No users to display");
            return;
          }

          const rows = users
            .map((user, i) => `
              <tr>
                <td style="border:1px solid #ccc;padding:8px">${user.userId ?? ""}</td>
                <td style="border:1px solid #ccc;padding:8px">${user.userName ?? ""}</td>
                <td style="border:1px solid #ccc;padding:8px">${user.expiresAt ?? ""}</td>
              </tr>
            `)
            .join("");

          const html = `
            <html>
              <head>
                <meta charset="utf-8" />
                <title>User Details</title>
              </head>
              <body>
                <h1>User Details</h1>
                <table style="border-collapse:collapse;width:100%">
                  <thead>
                    <tr>
                      <th style="border:1px solid #ccc;padding:8px">User ID</th>
                      <th style="border:1px solid #ccc;padding:8px">User Name</th>
                      <th style="border:1px solid #ccc;padding:8px">Expires At</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              </body>
            </html>
          `;

          const win = window.open("", "_blank");
          if (win) {
            win.document.write(html);
            win.document.close();
          } else {
            alert("Unable to open a new window to display users.");
          }
        }}
      >
        Get Users
      </button>
    </div>
  );
}

export default Users;