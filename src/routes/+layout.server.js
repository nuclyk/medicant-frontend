/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, fetch }) {
  const retreats = await fetch("http://localhost:8080/api/retreats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const roles = await fetch("http://localhost:8080/api/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const places = await fetch("http://localhost:8080/api/places", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    user: locals.user && {
      id: locals.user.sub,
      role: locals.user.role,
    },
    retreats: await retreats.json(),
    roles: await roles.json(),
    places: await places.json(),
  };
}
