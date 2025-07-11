import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import { API } from "$env/static/private";
import dayjs from "dayjs";

export const actions = {
  default: async ({ request, fetch, cookies, url, params }) => {
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
      check_in_date: dayjs(data.get("check_in_date")).toISOString(),
      leave_date: dayjs(data.get("leave_date")).toISOString(),
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
