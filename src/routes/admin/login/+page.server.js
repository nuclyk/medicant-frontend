import { API } from "$lib/api";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (locals.user) redirect(303, "/admin");
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  logout: async ({ locals, cookies }) => {
    cookies.delete("token", { path: "/" });
    locals.user = null;
  },

  login: async ({ request, cookies }) => {
    const data = await request.formData();

    const res = await fetch(API + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });

    const body = await res.json();

    if (!res.ok) {
      error(res.status, body.error);
    }

    cookies.set("token", body.token, { path: "/" });
    throw redirect(302, "/admin");
  },
};
