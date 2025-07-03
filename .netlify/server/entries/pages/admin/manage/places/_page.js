import { r as redirect, e as error } from "../../../../../chunks/index.js";
async function load({ parent, fetch }) {
  const p = await parent();
  if (!p.user) redirect(307, "/login");
  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }
  const res = await fetch(p.apiUrl + "places", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    error(res.status, "Could not fetch places");
  }
  return { places: await res.json() };
}
export {
  load
};
