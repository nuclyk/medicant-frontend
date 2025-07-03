import { j as ensure_array_like, m as maybe_selected, a as pop, p as push } from "../../../../../../chunks/index3.js";
import { c as countries } from "../../../../../../chunks/countries.js";
import dayjs from "dayjs";
import "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { a as attr, e as escape_html } from "../../../../../../chunks/attributes.js";
import "../../../../../../chunks/client.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let user = data.user;
  let roles = data.roles;
  let retreats = data.retreats;
  let places = data.places;
  let retreat = retreats.find((retreat2) => retreat2.id === user.retreat_id);
  let genders = ["Female", "Male", "Other"];
  const each_array = ensure_array_like(genders);
  const each_array_1 = ensure_array_like(countries);
  const each_array_2 = ensure_array_like(roles);
  const each_array_3 = ensure_array_like(retreats);
  const each_array_4 = ensure_array_like(places);
  $$payload.out += `<form method="POST"><div class="row g-3 mt-3"><div class="col"><div class="form-floating mb-3"><input class="form-control" type="text" name="first_name"${attr("value", user.first_name)} placeholder="Enter your first name" required/> <label for="first_name">First name</label></div> <div class="form-floating mb-3"><input class="form-control" type="text" name="last_name"${attr("value", user.last_name)} placeholder="Enter your last name" required/> <label for="last_name">Last name</label></div> <div class="form-floating mb-3"><input class="form-control" type="email" name="email"${attr("value", user.email)} placeholder="Enter your email" required/> <label for="email">Email</label></div> <div class="form-floating mb-3"><input class="form-control" type="text" name="phone"${attr("value", user.phone)} placeholder="Enter your phone number" required/> <label for="phone">Phone</label></div> <div class="form-floating mb-3"><input class="form-control" type="number" name="age"${attr("value", user.age)} placeholder="Enter your age"/> <label for="age">Age</label></div> <div class="form-floating mb-3"><select class="form-select" aria-label="Gender select" id="gender" name="gender" placeholder="Enter your gender">`;
  $$payload.select_value = user.gender;
  $$payload.out += `<!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let gender = each_array[index];
    $$payload.out += `<option${attr("value", gender)}${maybe_selected($$payload, gender)}${attr("key", index)}>${escape_html(gender)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label" for="gender">Gender</label></div> <div class="form-floating mb-3"><select class="form-select" aria-label="Nationality select" id="nationality" name="nationality" placeholder="Enter your nationality">`;
  $$payload.select_value = user.nationality;
  $$payload.out += `<!--[-->`;
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    let country = each_array_1[index];
    $$payload.out += `<option${attr("value", country.name)}${maybe_selected($$payload, country.name)}${attr("key", index)}>${escape_html(country.name)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label" for="nationality">Nationality</label></div> <div class="form-floating mb-3"><input class="form-control" type="text" name="diet"${attr("value", user.diet)} placeholder="Enter your diet" required/> <label for="diet">Diet</label></div> <div class="form-floating mb-3"><select class="form-select" aria-label="Role select" id="role" name="role" placeholder="Enter your role">`;
  $$payload.select_value = user.role;
  $$payload.out += `<!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let role = each_array_2[$$index_2];
    $$payload.out += `<option${attr("value", role.name)}${maybe_selected($$payload, role.name)}${attr("key", role.name)}>${escape_html(role.name)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label" for="role">Role</label></div> <div class="form-floating mb-3"><select class="form-select" aria-label="Retreat select" id="retreat" name="retreat" placeholder="Enter your role">`;
  $$payload.select_value = retreat.id;
  $$payload.out += `<!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let retreat2 = each_array_3[$$index_3];
    $$payload.out += `<option${attr("value", retreat2.id)}${maybe_selected($$payload, retreat2.id)}${attr("key", retreat2.id)}>${escape_html(retreat2.retreat_code)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label" for="retreat">Retreat</label></div> <div class="form-floating mb-3"><select class="form-select" aria-label="Retreat select" id="place" name="place" placeholder="Enter your place">`;
  $$payload.select_value = user.place;
  $$payload.out += `<!--[-->`;
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let place = each_array_4[$$index_4];
    $$payload.out += `<option${attr("value", place.name)}${maybe_selected($$payload, place.name)}${attr("key", place.id)}>${escape_html(place.name)}</option>`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label" for="place">Place</label></div> <div class="input-group mb-3"><span class="input-group-text">Check-in date</span> <input class="form-control" type="datetime" id="check_in_date" name="check_in_date" placeholder=""${attr("value", dayjs(user.check_in_date).format("YYYY-MM-DD HH:mm"))} disabled/></div> <div class="input-group mb-3"><span class="input-group-text">Check-out date</span> <input class="form-control" type="datetime" id="check_out_date" name="check_out_date" placeholder=""${attr("value", dayjs(user.check_out_date).format("YYYY-MM-DD HH:mm"))} disabled/></div> <div class="input-group mb-3"><span class="input-group-text">Planned leave date</span> <input class="form-control" type="date" id="leave_date" name="leave_date" placeholder="Leave date"${attr("value", dayjs(user.leave_date).format("YYYY-MM-DD"))}/></div> <div class="d-flex w-100 justify-content-center align-content-center"><button type="submit" class="btn btn-primary btn-lg mb-3">Save</button></div></div></div></form>`;
  pop();
}
export {
  _page as default
};
