import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import type { User } from "../lib/definitions";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("");

  if (token) {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role !== "Admin") {
      navigate("/reservations");
    }
  }

  function filterRole(role: string, filter: string) {
    if (filter === "") return true;
    return role === filter;
  }

  function handleRoleSelect(e) {
    setRoleFilter(e.target.value);
  }

  function getRoleBadge(role: string) {
    if (role === "Admin") return "bg-emerald-500/30 rounded-sm py-0.5 px-1.5";
    else if (role === "Owner") return "bg-pink-500/30 rounded-sm py-0.5 px-1.5";
    else return "bg-yellow-500/30 rounded-sm py-0.5 px-1.5";
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/users/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
  }, [token]);

  return (
    <>
      <TitleBar title="Users" />
      <div className="px-4 my-4">
        <div className="flex gap-2 text-left my-4 text-xs font-medium">
          <div>
            <span>Status: </span>
            <select
              className="border border-gray-200 bg-white py-0.5 px-2 rounded-md"
              onChange={(e) => handleRoleSelect(e)}
            >
              <option value="">All</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
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
            {users
              .filter((user) => filterRole(user.role, roleFilter))
              .map((user, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-1.5 px-0.5 text-center text-gray-500/60">
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
