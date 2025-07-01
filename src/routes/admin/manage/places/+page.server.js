import { API } from "$lib/api.js";
import { fail } from "@sveltejs/kit";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();

    try {
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

      return await res.json();
    } catch (err) {
      return fail(err.status, err);
    }
  },
};
