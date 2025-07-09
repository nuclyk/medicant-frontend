// import { redirect, error } from "@sveltejs/kit";
// import { API } from "$env/static/private";

// /** @type {import('./$types').PageServerLoad} */
// export async function load({ locals, cookies, fetch }) {
//   const res = await fetch(API + "users", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + cookies.get("token"),
//     },
//   });
//
//   if (!res.ok) {
//     error(res.status, res.statusText);
//   }
//
//   return { allUsers: await res.json() };
// }
