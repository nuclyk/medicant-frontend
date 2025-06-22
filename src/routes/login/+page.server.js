import { redirect, fail } from "@sveltejs/kit";
import dayjs from "dayjs";
import * as api from "$lib/api.js";

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

    const body = await api.post("login", user);

    if (body.errors) {
      return fail(401, body);
    }

    cookies.set("token", body.token, { path: "/" });
    throw redirect(302, "/");
  },
};
