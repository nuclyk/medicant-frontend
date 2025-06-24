import { redirect, fail } from "@sveltejs/kit";
import dayjs from "dayjs";
import { API } from "$lib/api";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (locals.user) redirect(303, "/");
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  logout: async ({ locals, cookies }) => {
    cookies.delete("token", { path: "/" });
    locals.user = null;
  },

  login: async ({ request, cookies }) => {
    const data = await request.formData();

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const res = await fetch(API + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const body = await res.json();

    cookies.set("token", body.token, { path: "/" });
    throw redirect(302, "/");
  },
};
