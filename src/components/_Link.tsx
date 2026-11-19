import { NavLink } from "react-router-dom";

export function _Link(props: { text: string; to: string }) {
  return (
    <NavLink
      to={props.to}
      className="bg-amber-400/40 text-amber-700 hover:bg-amber-400/50 rounded-md py-2 px-4 align-baseline font-semibold"
    >
      {props.text}
    </NavLink>
  );
}
