import { API } from "$lib/api";
import { redirect, error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }

  const response = await fetch(API + "retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { retreats: await response.json() };
}
