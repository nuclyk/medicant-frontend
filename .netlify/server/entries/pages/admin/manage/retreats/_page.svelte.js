import { j as ensure_array_like, a as pop, p as push } from "../../../../../chunks/index3.js";
import "../../../../../chunks/index.js";
import dayjs from "dayjs";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { e as escape_html, a as attr } from "../../../../../chunks/attributes.js";
import "../../../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let retreats = data.retreats.filter((retreat) => retreat.type != "flexible").sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  const each_array = ensure_array_like(retreats);
  $$payload.out += `<div class="container-fluid"><form method="POST"><p>Add new retreat</p> <div class="row bg-light border rounded-1 p-2 g-2"><div class="col-xxl input-group"><span class="input-group-text">Start date</span> <input class="form-control" type="date" id="startDate" name="startDate" required/></div> <div class="col-xxl input-group"><span class="input-group-text">End date</span> <input class="form-control" type="date" id="endDate" name="endDate" required/></div> <div class="col-xxl"><button type="submit" class="btn btn-dark flex-fill w-100">Add</button></div></div></form> <hr class="border border-1 opacity-50"/> <p>Edit retreats</p> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let retreat = each_array[$$index];
    $$payload.out += `<div class="row g-2 bg-light border rounded-1 p-2 my-2 align-items-center"><div class="col-lg-auto text-center"><p class="lead m-0 mx-3">${escape_html(retreat.retreat_code)}</p></div> <div class="col-lg-auto flex-fill"><input class="form-control" type="date" name="start_date"${attr("value", dayjs(retreat.start_date).format("YYYY-MM-DD"))} required/></div> <div class="col-lg-auto flex-fill"><input class="form-control" type="date" name="end_date"${attr("value", dayjs(retreat.end_date).format("YYYY-MM-DD"))} retreat.end_date="event.target.value" required/></div> <div class="col-lg-auto"><button type="button" class="btn btn-dark flex-fill w-100">Delete</button></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
