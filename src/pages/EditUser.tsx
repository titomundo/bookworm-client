import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFormErrors } from "../lib/getFormErrors";
import { _Link } from "../components/_Link";
import type { _Error } from "../lib/definitions";

export default function EditUser() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const user = useLocation().state;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [errors, setErrors] = useState<Array<_Error>>([]);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const data = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
    };

    await fetch(
      `https://bookworm-api-p9rh.onrender.com/api/v1/users/${user.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else if (data.errors) {
          setErrors(getFormErrors(data.errors));
          return;
        } else if (data.error) {
          setErrors(getFormErrors(data.error));
          return;
        }

        navigate(-1);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <TitleBar title="Edit User" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <_Link text="Return to list" to="/locations/" />
        </div>
        <ul>
          {errors.map((e) => (
            <li
              key={e.name}
              className="bg-red-500/30 px-1 rounded-sm w-fit mb-1"
            >
              <span>{e.name}: </span>
              {e.msg}
            </li>
          ))}
        </ul>
        <div className="flex justify-center text-gray-600">
          <form
            className="w-lg my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md"
            onSubmit={handleSubmit}
          >
            <h3 className="text-base font-semibold">Edit User</h3>
            <NavLink
              to="/employees/delete"
              state={user}
              className="text-red-700 hover:text-red-800 underline"
            >
              Delete User
            </NavLink>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="lastName">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="lastName">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-700 font-medium rounded-md py-2 text-center w-full block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
