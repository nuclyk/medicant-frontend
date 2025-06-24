import { API } from "$lib/api";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, parent }) {
  let par = await parent();
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
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      role: "participant",
      retreat_id: parseInt(formData.get("retreat")),
      check_in_date: new Date().toLocaleString(),
      leave_date: formData.get("leaveDate"),
      is_checked_in: true,
      diet: "",
      place: "None",
    };

    const response = await fetch(API + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  },
};
