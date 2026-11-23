import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import { TitleBar } from "../components/TitleBar";
import { NavLink } from "react-router-dom";
import type { User } from "../lib/definitions";
import { UserIcon } from "@heroicons/react/16/solid";

export default function Profile() {
  const [user, setUser] = useState<User>();
  const { isAuthenticated } = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "https://bookworm-api-p9rh.onrender.com/api/v1/users/profile",
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

          setUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [token]);

  return (
    <>
      <TitleBar title="Account Info" />
      {user ? (
        <div className="px-4">
          <div className="w-sm my-4 text-left flex flex-col gap-2 text-xs bg-white shadow p-4 rounded-md">
            <ul>
              <li>
                <div className="flex space-x-1 mb-1">
                  <UserIcon className="size-4 " />
                  <span className="inline-block font-semibold text-sm ">
                    {`${user.first_name} ${user.last_name}`}
                  </span>
                </div>
              </li>
              <li>
                <span className="font-semibold">E-mail: </span>
                {user.email}
              </li>
              <li>
                <span className="font-semibold">Role: </span>
                {user.role}
              </li>
            </ul>
            <div className="">
              <NavLink
                to="/employees/edit"
                state={user}
                className="bg-lime-600/20 hover:bg-lime-600/30 text-lime-600 hover:text-lime-800 font-medium rounded-md py-1 text-center w-full block"
              >
                Edit profile
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
