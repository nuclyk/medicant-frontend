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

    if (!res.ok) {
      return fail(res.status, { error: "Could not add a new retreat" });
    }

    return await res.json();
  },
};
