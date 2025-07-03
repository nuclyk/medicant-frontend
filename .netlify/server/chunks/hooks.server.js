import { p as parseJwt } from "./parseJWT.js";
function handle({ event, resolve }) {
  const token = event.cookies.get("token");
  if (token) {
    let user = parseJwt(token);
    let tokenExp = user.exp;
    let currentTime = /* @__PURE__ */ new Date();
    if (currentTime < new Date(tokenExp * 1e3)) {
      event.locals.user = parseJwt(token);
    }
  }
  return resolve(event);
}
function handleError({ error }) {
  console.error(error);
  return {
    message: error.message,
    code: error.code
  };
}
export {
  handle,
  handleError
};
