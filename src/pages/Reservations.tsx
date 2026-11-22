import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { TitleBar } from "../components/TitleBar";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";
import type { Reservation } from "../lib/definitions";
import { _Link } from "../components/_Link";

export default function Reservations() {
  const isAuthenticated = useAuth();
  const token = isAuthenticated ? localStorage.getItem("token") : null;
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("");

  function filterDate(date: string) {
    const current = new Date(date).getTime();

    if (!startDate || !endDate) return true;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return current >= start && current <= end;
  }

  function filterStatus(status: string, filter: string) {
    if (filter === "") return true;
    return status === filter;
  }

  function sortDateAscending(a: Reservation, b: Reservation) {
    return new Date(b.date).getDate() - new Date(a.date).getDate();
  }

  function handleStatusSelect(e) {
    setStatusFilter(e.target.value);
  }

  function clearDate() {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    setStartDate(null);
    setEndDate(null);
  }

  function getStatus(status: string) {
    const base = " rounded-sm font-medium py-0 px-1 capitalize";
    switch (status) {
      case "pending":
        return "bg-green-500/30 text-green-700" + base;
      case "ongoing":
        return "bg-amber-500/30 text-amber-600" + base;
      case "closed":
        return "bg-stone-500/30 text-stone-600" + base;
      case "cancelled":
        return "bg-red-500/30 text-red-500" + base;
      default:
        return "";
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://127.0.0.1:5000/api/v1/reservations/", {
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

          setReservations(
            data.sort((a: Reservation, b: Reservation) =>
              sortDateAscending(a, b),
            ),
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
  }, [token]);

  return (
    <>
      <TitleBar title="Reservations" />
      <div className="px-4">
        <div className="text-left my-4 text-xs font-medium">
          <_Link text="Create new reservation" to="/reservations/new" />
        </div>
        <div className="flex gap-2 text-left my-4 text-xs font-medium">
          <input
            id="startDate"
            name="startDate"
            type="date"
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="border border-gray-200 bg-white rounded-md py-0.5 px-2"
          />
          <span className="py-1 font-semibold">to</span>
          <input
            id="endDate"
            name="endDate"
            type="date"
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border border-gray-200 bg-white rounded-md py-0.5 px-2"
          />
          <button
            className="bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-700 rounded-md py-0.5 px-2"
            onClick={clearDate}
          >
            Clear Date filter
          </button>
          <div>
            <span>Status: </span>
            <select
              className="border border-gray-200 bg-white py-0.5 px-2 rounded-md"
              onChange={(e) => handleStatusSelect(e)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="closed">Closed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <table className="w-full text-left text-xs mt-5">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500/60">
              <th></th>
              <th className="py-2">Date</th>
              <th className="py-2">Reason</th>
              <th className="py-2">Location</th>
              <th className="py-2">Slot</th>
              <th className="py-2">Client</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter((e) => filterDate(e.date))
              .filter((e) => filterStatus(e.status, statusFilter))
              .map((e, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-1 px-2 text-center text-gray-500/60">
                    {index + 1}
                  </td>
                  <td className="py-1.5">
                    {format(e.date, "dd-MM-yyyy - hh:mm aaaa")}
                  </td>
                  <td className="py-1.5">{e.reason}</td>
                  <td className="py-1.5">{e.location.name}</td>
                  <td className="py-1.5">{e.slot}</td>
                  <td className="py-1.5">{e.client_name}</td>
                  <td className="py-1.5">
                    <span className={getStatus(e.status)}>{e.status}</span>
                  </td>
                  <td className="py-1 space-x-1.5">
                    <NavLink
                      to="/reservations/edit"
                      state={e}
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
