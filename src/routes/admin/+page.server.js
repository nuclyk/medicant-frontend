import { redirect } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (!locals.user) redirect(307, "/login");

  if (locals.user.role != "admin" && locals.user.role != "volunteer") {
    error(403, "Not authorized");
  }
}
