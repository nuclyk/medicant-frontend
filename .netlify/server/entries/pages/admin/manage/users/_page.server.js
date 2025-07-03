import { A as API } from "../../../../../chunks/private.js";
import { r as redirect, e as error } from "../../../../../chunks/index.js";
async function load({ fetch, cookies, locals }) {
  if (!locals.user) redirect(307, "/login");
  if (locals.user.role != "admin" && locals.user.role != "volunteer") {
    error(403, "Not authorized");
  }
  const users = await fetch(API + "users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token")
    }
  });
  return {
    users: await users.json()
  };
}
export {
  load
};
