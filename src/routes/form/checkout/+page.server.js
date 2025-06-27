import { API } from "$lib/api";
import dayjs from "dayjs";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  checkout: async ({ request, fetch }) => {
    const data = await request.formData();
    const email = data.get("email");

    const response = await fetch(API + "users/" + email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check_out_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        leave_date: dayjs().format("YYYY-MM-DD"),
        is_checked_in: false,
      }),
    });

    if (!response.ok) {
      return { error: "Failed to check out" };
    }

    return { success: true };
  },
};
