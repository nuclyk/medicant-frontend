import { API } from "$env/static/private";
import { error } from "@sveltejs/kit";

// /** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, fetch, depends, url, params }) {
  let page = url.searchParams.get("page") || 0;

  depends("app:users");

  const users = await fetch(API + "users?page=" + page, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  if (!users.ok) {
    error(users.status, "Error when fetching users");
  }

  return {
    users: await users.json(),
    page: parseInt(page),
  };
}
