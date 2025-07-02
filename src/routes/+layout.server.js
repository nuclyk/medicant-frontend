import { API } from "$env/static/private";

export async function load() {
  return {
    apiUrl: API,
  };
}
