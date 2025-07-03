import { r as redirect, e as error } from "../../../chunks/index.js";
import { A as API } from "../../../chunks/private.js";
import { p as parseJwt } from "../../../chunks/parseJWT.js";
async function load({ locals }) {
  if (locals.user) redirect(303, "/admin");
}
const actions = {
  logout: async ({ locals, cookies }) => {
    cookies.delete("token", { path: "/" });
    locals.user = null;
  },
  login: async ({ request, cookies, fetch }) => {
    const data = await request.formData();
    const res = await fetch(API + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password")
      })
    });
    if (!res.ok) {
      error(res.status, "Could not log in");
    }
    const body = await res.json();
    let token = parseJwt(body.token);
    cookies.set("token", body.token, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: token.exp - token.iat
    });
    throw redirect(302, "/admin");
  }
};
export {
  actions,
  load
};
