import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ parent, url, params, fetch }) {
  const p = await parent();

  if (!p.user) redirect(307, "/login");

  if (p.user.role != "admin" && p.user.role != "volunteer") {
    error(403, "Not authorized");
  }

  let id = url.searchParams.get("id");
  const res = await fetch(p.apiUrl + "users/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + p.token,
    },
  });

  if (!res.ok) {
    error(res.status, res.statusText);
  }

  return { user: await res.json() };
}
