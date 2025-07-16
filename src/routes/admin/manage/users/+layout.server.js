import { API } from "$env/static/private";
import { error } from "@sveltejs/kit";

// /** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, cookies, fetch, depends, url, params }) {
  const stats = await fetch(API + "stats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!stats.ok) {
    error(users.status, "Error when fetching stats");
  }

  return {
    stats: await stats.json(),
  };
}
