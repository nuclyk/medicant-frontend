import { API } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import dayjs from "dayjs";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  const res = await fetch(API + "retreats");
  return {
    retreats: await res.json(),
  };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();

    const now = dayjs().toISOString();

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
      check_in_date: now,
      leave_date: formData.get("leave_date"),
      place: 1,
    };

    // Check if the participant is already in db
    const userExists = await fetch(API + "users/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });

    // If the participant is already in db, just update the record
    if (userExists.ok) {
      // With this flag, the backend will reset check out date
      data.reset = true;

      const user = await userExists.json();
      const updateUser = await fetch(API + "users/" + user.userID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(data),
      });

      if (!updateUser.ok) {
        return fail(res.status, { error: body.error });
      }

      return await updateUser.json();
    }

    // If it's a first time participant, create new record
    const res = await fetch(API + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status > 400 && res.status < 500) {
      const body = await res.json();
      return fail(res.status, { error: body.error });
    }

    if (res.status >= 500) {
      return fail(res.status, { error: res.statusText });
    }

    return await res.json();
  },
};
