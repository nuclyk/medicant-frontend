import { API } from "$lib/api";
import { fail } from "@sveltejs/kit";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const res = await fetch(API + "retreats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify({
        type: "fixed",
        start_date: data.get("startDate"),
        end_date: data.get("endDate"),
      }),
    });

    const body = await res.json();

    if (body.errors) {
      return fail(400, body);
    }

    return { body };
  },
};
