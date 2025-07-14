import { API } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, depends, cookies, fetch }) {
  if (!locals.user) redirect(307, "/login");

  if (locals.user.role != "admin" && locals.user.role != "volunteer") {
    error(403, "Not authorized");
  }

  depends("data:users");

  const users = await fetch(API + "users/checkedin", {
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
