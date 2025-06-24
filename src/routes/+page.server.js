import { redirect } from "@sveltejs/kit";
import { API } from "$lib/api";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, fetch }) {
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
