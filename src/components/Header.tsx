import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-mist-800 text-left px-8 py-6 text-olive-300 w-full flex items-center">
      <div className="w-full">
        <Link
          to="/"
          className="py-1 px-5 font-bold text-lg inline rounded-md hover:bg-gray-400/40"
        >
          <span>Bookworm</span>
        </Link>
      </div>

      <div className="space-x-1">
        <Link
          to="/login"
          className="py-1 px-5 inline rounded-md font-semibold hover:bg-gray-400/40"
        >
          <span>Login</span>
        </Link>
        <Link
          to="/register"
          className="py-1 px-5 inline rounded-md font-semibold hover:bg-gray-400/40"
        >
          <span>Register</span>
        </Link>
      </div>
    </header>
  );
}
