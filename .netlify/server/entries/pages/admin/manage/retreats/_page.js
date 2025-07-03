import { r as redirect, e as error } from "../../../../../chunks/index.js";
async function load({ parent, fetch }) {
  const p = await parent();
  if (!p.user) redirect(307, "/login");
  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }
  const response = await fetch(p.apiUrl + "retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return { retreats: await response.json() };
}
export {
  load
};
