import { useLocation, useNavigate } from "react-router-dom";
import { TitleBar } from "../components/TitleBar";
import { useAuth } from "../utils/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function DeleteUser() {
  const { isAuthenticated, logout } = useAuth();
  const user = useLocation().state;
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const navigate = useNavigate();

  async function handleDelete() {
    await fetch(
      `https://bookworm-api-p9rh.onrender.com/api/v1/users/${user.id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => response.json())
      .then(() => {
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.sub;

          if (userId === user.id) {
            logout();
          }
        }

        navigate("/locations");
      });
  }

  return (
    <>
      <TitleBar title="Edit User" />
      <div className="flex justify-center items-center h-fit">
        <div className="w-lg my-4 text-left flex flex-col gap-2 text-sm bg-white shadow p-4 rounded-md">
          <p>
            Delete User? <b>This action cannot be undone.</b>
          </p>
          <button
            onClick={handleDelete}
            className="py-1 px-1.5 text-xs bg-red-700/20 text-red-700 hover:text-white font-medium rounded-sm hover:bg-red-500/90 hover:cursor-pointer"
          >
            Yes. Delete {user.first_name + " " + user.last_name}
          </button>
        </div>
      </div>
    </>
  );
}
