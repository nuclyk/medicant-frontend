import { A as API } from "../../../../chunks/private.js";
const actions = {
  generate: async ({ fetch, cookies }) => {
    const response = await fetch(API + "qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("token")
      }
    });
    const url = response.json();
    return { url };
  }
};
export {
  actions
};
