import { j as ensure_array_like, a as pop, p as push } from "../../../../../chunks/index3.js";
import { a as attr, e as escape_html } from "../../../../../chunks/attributes.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let users = data.users.filter((user) => user.role != "admin");
  let searchQuery = "";
  let filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const each_array = ensure_array_like(filteredUsers);
  $$payload.out += `<div class="container-fluid text-nowrap"><input type="search" name="search" id="search" class="form-control" placeholder="Search by email..."${attr("value", searchQuery)}/> <!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let user = each_array[index];
    $$payload.out += `<div class="row pt-3 pb-3 g-3 row-cols-2 border-bottom"><div class="col"><h5><a${attr("href", "/admin/manage/users/" + user.id)}>${escape_html(user.first_name)} ${escape_html(user.last_name)}</a></h5> ${escape_html(user.email)}</div></div>`;
  }
  $$payload.out += `<!--]--> <nav aria-label="Page navigation" class="d-flex mt-3 w-100 justify-content-center"><ul class="pagination"><li class="page-item"><a class="page-link" href="/">Previous</a></li> <li class="page-item"><a class="page-link" href="/">1</a></li> <li class="page-item"><a class="page-link" href="/">2</a></li> <li class="page-item"><a class="page-link" href="/">3</a></li> <li class="page-item"><a class="page-link" href="/">Next</a></li></ul></nav></div>`;
  pop();
}
export {
  _page as default
};
