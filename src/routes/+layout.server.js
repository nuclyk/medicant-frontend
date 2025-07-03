import { API } from "$env/static/private";

export async function load({ locals }) {
  return {
    apiUrl: API,
    user: locals.user,
  };
}
