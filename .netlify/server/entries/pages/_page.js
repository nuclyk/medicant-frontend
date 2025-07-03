import { r as redirect } from "../../chunks/index.js";
async function load() {
  redirect(303, "/login");
}
export {
  load
};
