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
      check_out_date: "",
      leave_date: formData.get("leave_date"),
      place: "None"
    };
    const userExists = await fetch(API + "users/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email })
    });
    if (userExists.ok) {
      const user = await userExists.json();
      const updateUser = await fetch(API + "users/" + user.userID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token
        },
        body: JSON.stringify(data)
      });
      if (!updateUser.ok) {
        return fail(res.status, { error: body.error });
      }
      return { msg: "success" };
    }
    const res = await fetch(API + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (res.status > 400 && res.status < 500) {
      const body2 = await res.json();
      return fail(res.status, { error: body2.error });
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
