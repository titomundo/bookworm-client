import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import type { User } from "../lib/definitions";
import { jwtDecode } from "jwt-decode";

export default function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const navigate = useNavigate();

  if (token) {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role !== "Admin") {
      navigate("/reservations");
    }
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
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th></th>
              <th className="w-30">First Name</th>
              <th className="w-40">Last Name</th>
              <th className="w-50">E-mail</th>
              <th>Role</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-0.5 px-1 text-center font-semibold text-gray-500">
                  {index + 1}
                </td>
                <td className="py-0.5">{user.first_name}</td>
                <td className="py-0.5">{user.last_name}</td>
                <td className="py-0.5">{user.email}</td>
                <td className="py-0.5">{user.role}</td>
                <td className="py-0.5 space-x-1.5">
                  <span>Edit</span>
                  <span>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
