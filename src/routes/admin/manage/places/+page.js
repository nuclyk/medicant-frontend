import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }
}
