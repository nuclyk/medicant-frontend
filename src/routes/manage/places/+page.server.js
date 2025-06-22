import * as api from "$lib/api.js";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const body = await api.post("places", {
      name: data.get("name"),
      capacity: data.get("capacity"),
    });

    if (body.errors) {
      return fail(400, body);
    }

    return { body };
  },
};
