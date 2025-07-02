import { parseJwt } from "$lib/parseJWT";

export function handle({ event, resolve }) {
  const token = event.cookies.get("token");

  if (token) {
    let user = parseJwt(token);
    let tokenExp = user.exp;
    let currentTime = new Date();
    if (currentTime < new Date(tokenExp * 1000)) {
      event.locals.user = parseJwt(token);
    }
  }

  return resolve(event);
}

export function handleError({ error }) {
  console.error(error);

  return {
    message: error.message,
    code: error.code,
  };
}
