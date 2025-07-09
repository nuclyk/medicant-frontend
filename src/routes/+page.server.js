import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.user && locals?.user?.role != "participant")
    redirect(302, "/admin");
}
