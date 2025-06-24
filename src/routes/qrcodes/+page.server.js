import { API } from "$lib/api";

/** @satisfies {import('./$types').Actions} */
export const actions = {
  generate: async ({ request, fetch, cookies }) => {
    const response = await fetch(API + "qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
      },
    });

    const url = response.json();
    return { url };
  },
};
