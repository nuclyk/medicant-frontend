import * as api from "$lib/api.js";
import { fail } from "@sveltejs/kit";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const body = await api.post("retreats", {
      type: "fixed",
      start_date: data.get("startDate"),
      end_date: data.get("endDate"),
    });

    if (body.errors) {
      return fail(400, body);
    }

    return { body };
  },
};
