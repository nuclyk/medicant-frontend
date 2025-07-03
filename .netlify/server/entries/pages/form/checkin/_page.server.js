import { A as API } from "../../../../chunks/private.js";
import { f as fail } from "../../../../chunks/index.js";
async function load({ fetch }) {
  const response = await fetch(API + "retreats");
  const data = await response.json();
  return {
    retreats: data
  };
}
const actions = {
  default: async ({ request, fetch }) => {
    const formData = await request.formData();
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      diet: formData.get("diet"),
      role: "participant",
      retreat_id: parseInt(formData.get("retreat")),
      check_in_date: /* @__PURE__ */ new Date(),
      leave_date: formData.get("leave_date"),
      is_checked_in: true,
      place: "None"
    };
    const res = await fetch(API + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status > 400 && res.status < 500) {
      const body = await res.json();
      return fail(res.status, { error: body.error });
    }
    if (res.status >= 500) {
      return fail(res.status, { error: res.statusText });
    }
    return await res.json();
  }
};
export {
  actions,
  load
};
