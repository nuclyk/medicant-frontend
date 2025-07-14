import { API } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  checkout: async ({ request, fetch }) => {
    const data = await request.formData();
    const email = data.get("email");

    const res = await fetch(API + "users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
      }),
    });

    const body = await res.json();

    if (!res.ok) {
      return fail(res.status, { error: body.error });
    }

    return { success: true };
  },
};
