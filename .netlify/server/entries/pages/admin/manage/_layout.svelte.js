import "clsx";
import { f as attr_class, a as pop, p as push, g as stringify } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/index4.js";
function Tabs($$payload, $$props) {
  push();
  let activeTab = page.url.pathname;
  $$payload.out += `<ul class="nav nav-tabs card-header-tabs"><li class="nav-item"><a${attr_class(`nav-link ${stringify(activeTab === "/admin/manage/users" ? "active" : "")}`)} aria-current="page" href="/admin/manage/users">Users</a></li> <li class="nav-item"><a${attr_class(`nav-link ${stringify(activeTab === "/admin/manage/places" ? "active" : "")}`)} aria-current="page" href="/admin/manage/places">Places</a></li> <li class="nav-item"><a${attr_class(`nav-link ${stringify(activeTab === "/admin/manage/retreats" ? "active" : "")}`)} href="/admin/manage/retreats">Retreats</a></li></ul>`;
  pop();
}
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="container-fluid mt-3"><div class="card"><div class="card-header">`;
  Tabs($$payload);
  $$payload.out += `<!----></div> <div class="card-body">`;
  children($$payload);
  $$payload.out += `<!----></div></div></div>`;
}
export {
  _layout as default
};
