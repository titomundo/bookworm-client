export default function FormErrorLi({ props }) {
  return (
    <li
      key={props.name}
      className="bg-red-500/30 text-red-700 px-1 rounded-sm w-fit mb-1 text-xs"
    >
      <span>{props.msg}</span>
    </li>
  );
}
