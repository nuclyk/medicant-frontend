import { A as API } from "../../../../chunks/private.js";
const actions = {
  checkout: async ({ request, fetch }) => {
    const data = await request.formData();
    const email = data.get("email");
    const response = await fetch(API + "users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    });
    if (!response.ok) {
      return { error: "Failed to check out" };
    }
    return { success: true };
  }
};
export {
  actions
};
