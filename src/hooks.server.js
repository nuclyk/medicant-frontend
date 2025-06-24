export function handle({ event, resolve }) {
  const token = event.cookies.get("token");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  event.locals.user = parseJwt(token);

  return resolve(event);
}

export function handleError({ event, error }) {
  console.error(error.stack);

  return {
    message: "Internal server error",
    code: "500",
  };
}
