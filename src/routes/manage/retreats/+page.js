import * as api from "$lib/api.js";

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent, fetch }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin") {
    error(403, "Not an admin");
  }

  const response = await fetch("http://localhost:8080/api/retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { retreats: await response.json() };
}
