import { API } from "$lib/api";
import { error } from "@sveltejs/kit";

import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin") {
    error(403, "Not an admin");
  }

  const response = await fetch(API + "places", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { places: await response.json() };
}
