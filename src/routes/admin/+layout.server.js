import { API } from "$env/static/private";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, fetch, cookies }) {
  const users = await fetch(API + "users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  const retreats = await fetch(API + "retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const roles = await fetch(API + "roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  const places = await fetch(API + "places", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  const rooms = await fetch(API + "rooms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token"),
    },
  });

  return {
    user: locals.user && {
      id: locals.user.sub,
      role: locals.user.role,
    },
    token: cookies.get("token"),
    users: await users.json(),
    retreats: await retreats.json(),
    roles: await roles.json(),
    places: await places.json(),
    rooms: await rooms.json(),
  };
}
