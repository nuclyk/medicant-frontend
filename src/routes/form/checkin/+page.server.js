import { API } from "$lib/api";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  const response = await fetch(API + "retreats");
  const data = await response.json();

  return {
    retreats: data,
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();

    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      diet: formData.get("diet"),
      role: "participant",
      retreat_id: parseInt(formData.get("retreat")),
      check_in_date: new Date(),
      leave_date: formData.get("leave_date"),
      is_checked_in: true,
      place: "None",
    };

    const res = await fetch(API + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (body.error) {
      return fail(400, { error: body.error, formData: data });
    }

    return body;
  },
};
