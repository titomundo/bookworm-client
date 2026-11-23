import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFormErrors } from "../lib/getFormErrors";
import { _Link } from "../components/_Link";
import type { Location } from "../lib/definitions";
import type { _Error } from "../lib/definitions";

export default function CreateEmployee() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [errors, setErrors] = useState<Array<_Error>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await fetch("https://bookworm-api-p9rh.onrender.com/api/v1/locations/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLocations(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData(e.target);
    const data = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      location_id: formData.get("location_id"),
    };

    await fetch("https://bookworm-api-p9rh.onrender.com/api/v1/users/", {
      method: "POST",
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
          setErrors(getFormErrors(data.error));
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
      <TitleBar title="Register new employee" />
      <div className="px-4 text-left">
        <div className="my-4 text-xs">
          <_Link text="Return to list" to="/employees/" />
        </div>
        <ul className="text-xs text-red-700">
          {errors.map((e) => (
            <li className="bg-red-500/30 px-1 rounded-sm w-fit mb-1">
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
            <h3 className="text-base font-semibold">New Employee</h3>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="firstName">
                First name:
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="lastName">
                Last name:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="email">
                E-mail:
              </label>
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="password">
                Password:
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium ml-0.5" htmlFor="location">
                Location:
              </label>
              <select
                name="location_id"
                className="px-2 py-0.5 border rounded-md border-gray-200 bg-gray-50 resize-none"
                required
              >
                {locations.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
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
