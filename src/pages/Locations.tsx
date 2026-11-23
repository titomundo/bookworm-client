import { TitleBar } from "../components/TitleBar";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { _Link } from "../components/_Link";
import type { Location } from "../lib/definitions";
import { jwtDecode } from "jwt-decode";

export default function Locations() {
  const [locations, setLocations] = useState<Array<Location>>([]);
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const role = jwtDecode(token).role;

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
          if (data.msg) {
            console.log("Invalid credentials");
            return;
          }

          setLocations(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <>
      <TitleBar title="Locations" />
      <div className="px-4">
        <div className="text-left my-4 text-xs font-medium">
          {role !== "Employee" && (
            <_Link text="Create new location" to="/locations/new" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {locations.map((e) => (
            <div
              className="text-xs bg-white shadow px-4 py-4 rounded-md text-left flex flex-col gap-2"
              key={e.id}
            >
              <div className="text-gray-600">
                <ul>
                  <li>
                    <span className="font-semibold">Location name: </span>
                    {e.name}
                  </li>
                  <li>
                    <span className="font-semibold">Description: </span>
                    {e.description}
                  </li>
                  <li>
                    <span className="font-semibold">Capacity: </span>
                    {e.capacity}
                  </li>
                </ul>
              </div>
              {role !== "Employee" && (
                <div className="space-y-1">
                  <div className="">
                    <NavLink
                      to="/locations/edit"
                      state={e}
                      className="bg-teal-600/20 hover:bg-teal-600/30 text-teal-600 hover:text-teal-800 font-medium rounded-md py-1 text-center w-full block"
                    >
                      Edit
                    </NavLink>
                  </div>
                  <div className="">
                    <NavLink
                      to="/employees"
                      state={e}
                      className="bg-lime-600/20 hover:bg-lime-600/30 text-lime-600 hover:text-lime-800 font-medium rounded-md py-1 text-center w-full block"
                    >
                      Employees
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
