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

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `http://127.0.0.1:5000/api/v1/locations/${location.id}/employees`,
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

        <table className="w-full text-left text-xs mt-5 text-gray-600">
          <thead>
            <tr className="border-b border-gray-400 text-gray-400">
              <th></th>
              <th className="w-30">First Name</th>
              <th className="w-40 pl-0.5">Last Name</th>
              <th className="w-50">E-mail</th>
              <th>Role</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-1 px-0.5 text-center text-gray-400">
                  {index + 1}
                </td>
                <td className="py-1">{user.first_name}</td>
                <td className="py-1">{user.last_name}</td>
                <td className="py-1">{user.email}</td>
                <td className="py-1">{user.role}</td>
                <td className="py-1 space-x-1.5">
                  <NavLink to="/employees/edit" state={user}>
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
