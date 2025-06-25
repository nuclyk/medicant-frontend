import { API } from "$lib/api";

import { redirect, error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies, locals }) {
  if (!locals.user) redirect(307, "/login");

  if (locals.user.role != "admin") {
    error(403, "Not an admin");
  }

  const users = await fetch(API + "users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  return {
    users: await users.json(),
  };
}
