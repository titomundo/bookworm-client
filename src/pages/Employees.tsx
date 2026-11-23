import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import type { User } from "../lib/definitions";
import { jwtDecode } from "jwt-decode";
import { _Link } from "../components/_Link";
import { useLocation } from "react-router-dom";

export default function Employees() {
  const [users, setUsers] = useState<Array<User>>([]);
  const location = useLocation().state;
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const navigate = useNavigate();

  if (token) {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role === "Employee") {
      navigate("/dashboard");
    }
  }

  function getRoleBadge(role: string) {
    if (role === "Admin") return "bg-emerald-500/30 rounded-sm py-0.5 px-1.5";
    else if (role === "Owner") return "bg-pink-500/30 rounded-sm py-0.5 px-1.5";
    else return "bg-yellow-500/30 rounded-sm py-0.5 px-1.5";
  }

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `https://bookworm-api-p9rh.onrender.com/api/v1/locations/${location.id}/employees`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.msg) {
            console.log("Invalid credentials");
            return;
          }

          setUsers(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token, location.id]);

  return (
    <>
      <TitleBar title="Employees" />
      <div className="px-4 my-4">
        <div className="text-left my-4 text-xs font-medium space-x-1.5">
          <_Link text="Return to list" to="/locations" />
          <_Link text="Register new employee" to="/employees/new" />
        </div>

        <table className="w-full text-left text-xs mt-5">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500/60">
              <th></th>
              <th className="w-30 py-2">First Name</th>
              <th className="w-40 py-2">Last Name</th>
              <th className="w-50 py-2">E-mail</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-1 px-0.5 text-center text-gray-500/60">
                  {index + 1}
                </td>
                <td className="py-1.5">{user.first_name}</td>
                <td className="py-1.5">{user.last_name}</td>
                <td className="py-1.5">{user.email}</td>
                <td className="py-1.5">
                  <span className={getRoleBadge(user.role)}>{user.role}</span>
                </td>
                <td className="py-1 space-x-1.5">
                  <NavLink
                    to="/employees/edit"
                    state={user}
                    className="text-emerald-800 font-semibold underline decoration-emerald-800"
                  >
                    Edit
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
