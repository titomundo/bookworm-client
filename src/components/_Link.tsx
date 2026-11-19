import { NavLink } from "react-router-dom";

export function _Link(props: { text: string; to: string }) {
  return (
    <NavLink
      to={props.to}
      className="bg-yellow-500/90 text-white hover:text-yellow-700 rounded-md py-2 px-4 align-baseline font-semibold"
    >
      {props.text}
    </NavLink>
  );
}
