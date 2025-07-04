import { redirect } from "@sveltejs/kit";
import { API } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import dayjs from "dayjs";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, parent, fetch, params }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }

  const res = await fetch(API + "users/" + params.slug, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  if (res.status !== 302) {
    error(404, "User not found");
  }

  const user = await res.json();
  return { user: user };
}

export const actions = {
  default: async ({ request, fetch, params, cookies }) => {
    const data = await request.formData();

    const updateUser = {
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      phone: data.get("phone"),
      age: data.get("age"),
      gender: data.get("gender"),
      nationality: data.get("nationality"),
      role: data.get("role"),
      retreat_id: parseInt(data.get("retreat")),
      leave_date: data.get("leave_date"),
      diet: data.get("diet"),
      place: data.get("place"),
    };

    const res = await fetch(API + "users/" + params.slug, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
      body: JSON.stringify(updateUser),
    });

    if (!res.ok) {
      return fail(res.status, { error: "Could not update the participant" });
    }

    return await res.json();
  },
};
