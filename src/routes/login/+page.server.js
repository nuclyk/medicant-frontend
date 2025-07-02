import { error, redirect } from "@sveltejs/kit";
import { API } from "$env/static/private";

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

  login: async ({ request, cookies, fetch }) => {
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

    if (!res.ok) {
      error(res.status, "Could not log in");
    }

    const body = await res.json();

    cookies.set("token", body.token, { path: "/" });
    throw redirect(302, "/admin");
  },
};
