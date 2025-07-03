import { a as attr, e as escape_html } from "./attributes.js";
function FloatingInputField($$payload, $$props) {
  let {
    id,
    type,
    name,
    placeholder = "",
    label = "Type in here...",
    value
  } = $$props;
  $$payload.out += `<div class="form-floating mb-3"><input class="form-control"${attr("id", id)}${attr("type", type)}${attr("name", name)}${attr("placeholder", placeholder)}${attr("value", value)} required/> <label${attr("for", id)}>${escape_html(label)}</label></div>`;
}
export {
  FloatingInputField as F
};
