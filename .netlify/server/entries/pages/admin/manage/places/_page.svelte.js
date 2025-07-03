import { j as ensure_array_like, a as pop, p as push } from "../../../../../chunks/index3.js";
import "../../../../../chunks/index.js";
import "../../../../../chunks/client.js";
import "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { a as attr } from "../../../../../chunks/attributes.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let places = data.places.filter((place) => place.name != "None");
  let placeName = "";
  let placeCapacity = void 0;
  const each_array = ensure_array_like(places);
  $$payload.out += `<div class="container-fluid"><form method="POST"><p>Add new place</p> <div class="row bg-light border rounded-1 p-2 g-2"><div class="col-xxl flex-fill"><input class="form-control" type="text" name="name" placeholder="Add new place"${attr("value", placeName)} required/></div> <div class="col-xxl flex-fill"><input class="form-control" type="number" name="capacity" placeholder="Capacity"${attr("value", placeCapacity)} required/></div> <div class="col-xxl"><button type="submit" class="btn btn-dark flex-fill w-100">Add</button></div></div></form> <hr class="border border-1 opacity-50"/> <p>Edit places</p> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let place = each_array[$$index];
    $$payload.out += `<div class="row g-2 bg-light border rounded-1 p-2 my-2"><div class="col-lg-auto flex-fill"><input class="form-control" type="text" name="name"${attr("value", place.name)} required/></div> <div class="col-lg-auto flex-fill"><input class="form-control" type="number" name="capacity"${attr("value", place.capacity)} required/></div> <div class="col-lg-auto"><button type="button" class="btn btn-dark flex-fill w-100">Delete</button></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
