import { e as escape_html } from "../../../chunks/attributes.js";
import "clsx";
import { a as pop, p as push } from "../../../chunks/index3.js";
import { p as page } from "../../../chunks/index4.js";
function _error($$payload, $$props) {
  push();
  $$payload.out += `<div class="container text-center h-100 w-100 align-content-center"><div class="row"><div class="col"><h4>${escape_html(page.status)} : ${escape_html(page.error.message)}</h4></div></div></div>`;
  pop();
}
export {
  _error as default
};
