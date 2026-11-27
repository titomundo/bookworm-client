import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-7 w-full h-120 overflow-hidden shadow">
          <div className="flex col-span-2 bg-lime-900/70 px-10 items-center h-full">
            <div className="text-left text-white">
              <p className="py-2 font-bold text-4xl">Bookworm</p>
              <p className="font-medium py-4 text-olive-200">
                Booking reservations has never been easier.
              </p>
              <NavLink
                className="rounded-md bg-teal-500/70 hover:bg-teal-600 font-medium px-12 py-2 shadow"
                to="/register"
              >
                Try It! &rarr;
              </NavLink>
            </div>
          </div>
          <div className="col-span-5">
            <img
              className=""
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F09%2F14%2F11%2F43%2Frestaurant-939435_1280.jpg&f=1&nofb=1&ipt=ed9faf9fa1434630fbd843ee6eeff30444c3143a9a803510d58d1b84ef3afcbc&ipo=images"
            />
          </div>
        </div>
      </div>

      <div id="features" className="py-32 px-12">
        <div className="pb-6 underline">
          <h1 className="text-4xl font-bold">Features</h1>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div className="bg-white shadow rounded-md">
            <div className="font-medium text-left px-6 py-5">
              <h3 className="font-semibold underline">Reservations</h3>
              <div className="text-sm">
                <p className="text-olive-600">
                  Easily Create and Manage reservations.
                </p>
                <ul className="list-disc list-inside pt-2 text-olive-500">
                  <li>Schedule future reservations.</li>
                  <li>Assign tables to reservations.</li>
                  <li>Search reservations by filter.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-md">
            <div className="font-medium text-left px-6 py-5">
              <h3 className="font-semibold underline">Locations</h3>
              <div className="text-sm">
                <p className="text-olive-600">
                  Manage multiple establishments to your businesses.
                </p>
                <ul className="list-disc list-inside pt-2 text-olive-500">
                  <li>Create multiple establishments.</li>
                  <li>Add employees to each location.</li>
                  <li>Manage resevations per location.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-md">
            <div className="font-medium text-left px-6 py-5">
              <h3 className="font-semibold underline">Roles</h3>
              <div className="text-sm">
                <p className="text-olive-600">
                  Create accounts for your employees.
                </p>
                <ul className="list-disc list-inside pt-2 text-olive-500">
                  <li>Employees can only manage reservations.</li>
                  <li>Assign employees to each location.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-7 w-full h-120 overflow-hidden shadow">
          <div className="col-span-4">
            <img
              className=""
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2021%2F07%2F20%2F06%2F04%2Frestaurant-6479818_1280.jpg&f=1&nofb=1&ipt=f394947934e26fe0813cf7161b188c3a8abdfa12194a51937ccb3444ff6939b8&ipo=images"
            />
          </div>
          <div className="flex col-span-3 bg-teal-900/70 px-10 items-center h-full">
            <div className="text-left text-white">
              <p className="py-2 font-bold text-4xl">Easy to use</p>
              <ul className="font-medium py-4 text-olive-200 list-decimal list-inside">
                <li>Create your account</li>
                <li>Add your businesses</li>
                <li>Book reservations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="py-32 px-12 w-full">
        <div className="pb-6 underline">
          <h1 className="text-4xl font-bold">Contact</h1>
        </div>

        <div className="flex justify-center">
          <div className="bg-white shadow rounded-md w-2xl py-6 px-2">
            <div className="font-medium text-left px-6 py-5">
              <h3 className="font-semibold">
                Got Questions? Send us an E-mail
              </h3>
              <div className="text-sm">
                <a
                  href="mailto:tito.alberto.mundo@gmail.com"
                  className="text-white bg-teal-800 hover:bg-teal-700 font-semibold w-full block text-center py-3 rounded-md mt-4"
                >
                  Send E-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="footer"
        className="bg-olive-200 border-t border-olive-300 py-12 px-10 text-olive-500 font-medium"
      >
        <div className="flex items-center">
          <span className="w-full text-left">
            Bookworm &trade; {new Date().getFullYear()}
          </span>
          <div className="text-sm flex gap-4">
            <span className="hover:underline hover:text-olive-600">About</span>
            <span className="hover:underline hover:text-olive-600">
              Contact
            </span>
            <span className="hover:underline hover:text-olive-600">
              <a href="https://github.com/titomundo/bookworm-client">Source</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
