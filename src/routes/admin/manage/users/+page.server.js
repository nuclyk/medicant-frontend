import { API } from "$env/static/private";

import { redirect, error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (!locals.user) redirect(307, "/login");

  if (locals.user.role != "admin" && locals.user.role != "volunteer") {
    error(403, "Not authorized");
  }

  // const users = await fetch(API + "users", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + cookies.get("token"),
  //   },
  // });
  //
  // return {
  //   users: await users.json(),
  // };
}
