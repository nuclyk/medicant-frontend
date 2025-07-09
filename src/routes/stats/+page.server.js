import { error } from "@sveltejs/kit";
import { API } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  try {
    const res = await fetch(API + "stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      error(res.status, "Error when fetching stats");
    }

    return { stats: await res.json() };
  } catch (e) {
    console.log(e);
  }
}
