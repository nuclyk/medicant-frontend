import "clsx";
import { F as FloatingInputField } from "../../../../chunks/FloatingInputField.js";
import "../../../../chunks/client.js";
function _page($$payload) {
  $$payload.out += `<div class="row row-cols-1 g-3 mt-2"><div class="col"><h3>Check-out</h3></div> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="col"><form method="POST" action="?/checkout">`;
    FloatingInputField($$payload, {
      id: "email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      label: "Email"
    });
    $$payload.out += `<!----> <button type="submit" class="btn btn-primary btn-lg mt-2">Check-out</button></form></div>`;
  }
  $$payload.out += `<!--]--></div>`;
}
export {
  _page as default
};
