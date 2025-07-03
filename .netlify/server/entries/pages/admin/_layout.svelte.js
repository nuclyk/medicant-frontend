import "clsx";
import { a as pop, p as push } from "../../../chunks/index3.js";
function Nav($$payload, $$props) {
  const { user } = $$props;
  $$payload.out += `<nav class="navbar navbar-expand-lg bg-body-tertiary"><div class="container-fluid"><a class="navbar-brand" href="/admin">Medicant</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link active" aria-current="page" href="/admin">Dashboard</a></li> <li class="nav-item"><a class="nav-link" href="/form/checkin" target="_blank">Check-in</a></li> <li class="nav-item"><a class="nav-link" href="/form/checkout" target="_blank">Check-out</a></li>  <li class="nav-item"><a class="nav-link" href="/admin/manage/users">Manage</a></li> <li class="nav-item">`;
  if (!user) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a class="nav-link btn-success" href="/admin/login">Login</a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<form action="/login?/logout" method="POST"><button type="submit" class="btn btn-danger">Logout</button></form>`;
  }
  $$payload.out += `<!--]--></li></ul></div></div></nav>`;
}
function _layout($$payload, $$props) {
  push();
  let { children, data } = $$props;
  $$payload.out += `<div class="container-fluid"><div class="row row-cols-1 g-3"><div class="col">`;
  Nav($$payload, { user: data.user });
  $$payload.out += `<!----> `;
  children($$payload);
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
export {
  _layout as default
};
