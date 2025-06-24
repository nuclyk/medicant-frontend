import { API } from "$lib/api";

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent, fetch }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin") {
    error(403, "Not an admin");
  }

  const response = await fetch(API + "retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { retreats: await response.json() };
}
