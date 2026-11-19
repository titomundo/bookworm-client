import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFormErrors } from "../lib/getFormErrors";
import { _Link } from "../components/_Link";
import type { FormError } from "../lib/definitions";
import FormErrorLi from "../components/FormError";

export default function EditUser() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const user = useLocation().state;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [errors, setErrors] = useState<Array<FormError>>([]);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
    };

    await fetch(`http://127.0.0.1:5000/api/v1/users/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        } else if (data.errors) {
          setErrors(getFormErrors(data.errors));
          return;
        } else if (data.error) {
          setErrors(getFormErrors([data.error]));
          return;
        }

        navigate("/locations");
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
          <_Link text="Return to list" to="/businesses/" />
        </div>
        <ul>
          {errors.map((e) => (
            <FormErrorLi props={e} />
          ))}
        </ul>
        <div className="flex justify-center text-gray-600">
          <form
            className="w-lg my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md"
            onSubmit={handleSubmit}
          >
            <h3 className="text-base font-semibold">Edit Business</h3>
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
