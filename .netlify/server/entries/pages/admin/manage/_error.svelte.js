import { e as escape_html } from "../../../../chunks/attributes.js";
import "clsx";
import { a as pop, p as push } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/index4.js";
function _error($$payload, $$props) {
  push();
  $$payload.out += `<p class="text-center lead">${escape_html(page.status)} : ${escape_html(page.error.message)}</p>`;
  pop();
}
export {
  _error as default
};
