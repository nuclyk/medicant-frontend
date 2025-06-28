export function handle({ event, resolve }) {
  const token = event.cookies.get("token");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.log(e);
      return null;
    }
  };

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
  console.error(error.stack);

  return {
    message: "Internal server error",
    code: "500",
  };
}
