import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { API } from "$env/static/private";

export const actions = {
  default: async ({ request, fetch, cookies, url, params }) => {
    const data = await request.formData();
    console.log(url, params);

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
      place: parseInt(data.get("place")),
    };

    const res = await fetch(API + "users/" + url.searchParams.get("id"), {
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
