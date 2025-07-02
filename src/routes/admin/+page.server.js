import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { API } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, fetch }) {
  if (!locals.user) redirect(307, "/login");

  if (locals.user.role != "admin" && locals.user.role != "volunteer") {
    error(403, "Not authorized");
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
