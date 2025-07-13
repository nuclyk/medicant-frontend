import { API } from "$env/static/private";

// /** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, fetch, depends }) {
  depends("manage:users");

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
