import { API } from "$lib/api";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const res = await fetch(API + "retreats", {
      method: "POST",
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
