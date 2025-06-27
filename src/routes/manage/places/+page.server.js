import { API } from "$lib/api.js";
import { fail } from "@sveltejs/kit";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();

    const res = await fetch(API + "places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({
        name: data.get("name"),
        capacity: data.get("capacity"),
      }),
    });

    const body = await res.json();

    if (body.errors) {
      return fail(400, body);
    }

    return { body };
  },
};
