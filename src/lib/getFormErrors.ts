import type { _Error } from "../lib/definitions";

export function getFormErrors(errors: _Error) {
  const list: Array<_Error> = [];

  Object.entries(errors).forEach(([key, value]) => {
    list.push({ name: key, msg: value });
  });

  return list;
}
