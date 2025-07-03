import { j as ensure_array_like, m as maybe_selected, a as pop, p as push } from "../../../chunks/index3.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import "../../../chunks/index.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { e as escape_html, a as attr } from "../../../chunks/attributes.js";
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  dayjs.extend(utc);
  let users = data?.users?.filter((user) => user.role != "admin" && user.check_out_date === "").sort((a, b) => new Date(b.check_in_date) - new Date(a.check_in_date));
  let places = data?.places;
  let roles = data?.roles?.filter((role) => role.name != "admin");
  let veg = users?.filter((user) => user.diet === "Vegetarian").length;
  ((placeName) => {
    return users?.filter((user) => user.place === placeName).length;
  })();
  let currentlyStaying = users?.filter((user) => !user.check_out_date).length;
  let onRetreat = (retreatType) => users?.filter((user) => {
    let retreat = findRetreat(user.retreat_id);
    if (retreat.type === retreatType && user.check_out_date == "") return true;
  }).length;
  let leaving = users?.filter((user) => new Date(user.leave_date).toDateString() === (/* @__PURE__ */ new Date()).toDateString() && !user.check_out_date).length;
  let newArrivals = users?.filter((user) => new Date(user.check_in_date).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).length;
  function findRetreat(retreat_id) {
    const retreat = data.retreats.find((retreat2) => retreat_id === retreat2.id);
    return retreat;
  }
  const each_array = ensure_array_like(users);
  $$payload.out += `<div class="container-fluid"><div class="row mb-3 mt-3 g-3 vh-25"><div class="col"><div class="card"><div class="card-header">Participants</div> <ul class="list-group list-group-flush text-nowrap"><li class="list-group-item d-flex justify-content-between align-items-center">Currently staying: <span class="badge text-bg-primary rounded-pill">${escape_html(currentlyStaying)}</span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Arrived today: <span class="badge text-bg-primary rounded-pill">${escape_html(newArrivals)}</span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Leaving today: <span class="badge text-bg-primary rounded-pill">${escape_html(leaving)}</span></li></ul></div></div> <div class="col"><div class="card"><div class="card-header">Retreats</div> <ul class="list-group list-group-flush text-nowrap"><li class="list-group-item d-flex justify-content-between align-items-center">Next retreat date: <span class="badge text-bg-primary rounded-pill">?</span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Flexible retreat: <span class="badge text-bg-primary rounded-pill">${escape_html(onRetreat("flexible"))}</span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Fixed reatreat: <span class="badge text-bg-primary rounded-pill">${escape_html(onRetreat("fixed"))}</span></li></ul></div></div> <div class="col"><div class="card"><div class="card-header">Stats</div> <ul class="list-group list-group-flush text-nowrap"><li class="list-group-item d-flex justify-content-between align-items-center">Participants / Volunteers: <span class="badge text-bg-primary rounded-pill">`;
  if (users) {
    $$payload.out += "<!--[-->";
    const volunteers = users.filter((user) => user.role === "volunteer").length;
    $$payload.out += `${escape_html(users.length - volunteers)} / ${escape_html(volunteers)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Veg / Non-veg: <span class="badge text-bg-primary rounded-pill">${escape_html(veg)} / ${escape_html(users.length - veg)}</span></li> <li class="list-group-item d-flex justify-content-between align-items-center">Male / Female: <span class="badge text-bg-primary rounded-pill">`;
  if (users) {
    $$payload.out += "<!--[-->";
    const male = users.filter((user) => user.gender === "Male").length;
    const female = users.filter((user) => user.gender === "Female").length;
    $$payload.out += `${escape_html(male)} / ${escape_html(female)}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span></li></ul></div></div></div> <div class="row"><div class="col"><div class="table-responsive text-nowrap"><table class="table table-striped table-hover borderless align-middle text-capitalize"><thead><tr><th scope="col">Name</th><th scope="col">Retreat</th><th scope="col">Check-In</th><th scope="col">Check-Out</th><th scope="col">Leave date</th><th scope="col">Room <span class="badge text-bg-primary rounded-pill" aria-label="Info" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" data-bs-title="After check-in, please select correct room for the participant">?</span></th><th scope="col">Role</th><th scope="col">Donation <span class="badge text-bg-primary rounded-pill" aria-label="Info" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" data-bs-title="Donation 500 baht per night based on the planned leave date.">?</span></th></tr></thead><tbody><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let user = each_array[index];
    const each_array_1 = ensure_array_like(places);
    const each_array_2 = ensure_array_like(roles);
    $$payload.out += `<tr><td><a${attr("href", "admin/manage/users/" + user.id)}>${escape_html(user.first_name)}
                                        ${escape_html(user.last_name)}</a></td><td>${escape_html(findRetreat(user.retreat_id).retreat_code)}</td><td>${escape_html(dayjs(user.check_in_date).format("DD MMM HH:mm"))}</td><td><button type="button" class="btn btn-primary btn-sm w-100">Checkout</button></td><td><div class="input-group"><input class="form-control form-control-sm" type="date" name="leave_date"${attr("value", dayjs(user.leave_date).format("YYYY-MM-DD"))} id="leaveDate"/> `;
    if (dayjs().isSame(user.leave_date, "day") || dayjs().isAfter(user.leave_date, "day") && user.check_out_date == "") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<button aria-label="Info" type="button" class="btn btn-warning btn-sm" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" data-bs-title="&lt;p>Check if the participant is still in the retreat.
                                        As per leave date, they should be checked out already.&lt;/p>&lt;p>Change the leave date
                                        or check them out.&lt;/p>">i</button>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></td><td><select class="form-select form-select-sm" style="min-width: 12rem;" aria-label="Place select" name="place">`;
    $$payload.select_value = user.place;
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let place = each_array_1[$$index];
      const totalInPlace = users.filter((u) => u.place === place.name).length;
      $$payload.out += `<option${attr("value", place.name)}${maybe_selected($$payload, place.name)}>${escape_html(place.name)} `;
      if (place.name !== "None") {
        $$payload.out += "<!--[-->";
        $$payload.out += `(${escape_html(totalInPlace)}/${escape_html(place.capacity)})`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></option>`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select></td><td><select class="form-select form-select-sm" style="min-width: 8rem;" aria-label="Role select" name="role"><option${attr("value", user.role)}${maybe_selected($$payload, user.role)} selected>${escape_html(user.role)}</option><!--[-->`;
    for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
      let role = each_array_2[$$index_1];
      $$payload.out += `<option${attr("value", role.name)}${maybe_selected($$payload, role.name)}>${escape_html(role.name)}</option>`;
    }
    $$payload.out += `<!--]--></select></td><td>${escape_html(dayjs(user.leave_date).diff(user.check_in_date, "day") * 500)}</td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
