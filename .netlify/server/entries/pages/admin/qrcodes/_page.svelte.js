import { a as attr } from "../../../../chunks/attributes.js";
function _page($$payload) {
  let checkin_qr = "http://localhost:5713/form/checkin";
  let checkout_qr = "http://localhost:5713/form/checkout";
  $$payload.out += `<div class="row"><div class="col"><img src="http://localhost:8080/assets/qr_checkin.png" alt="QR code for check-in"/> <form method="POST" action="?/generate"><div class="form-floating mb-3"><input class="form-control" type="text" id="qrcheckin" name="qrcheckin"${attr("value", checkin_qr)} placeholder="QRCheckin URL" required/> <label for="qrcheckin">URL for check-in</label></div></form></div> <div class="col"><img src="http://localhost:8080/assets/qr_checkin.png" alt="QR code for check-out"/> <form method="GET"><div class="form-floating mb-3"><input class="form-control" type="text" id="qrcheckout" name="qrcheckout"${attr("value", checkout_qr)} placeholder="QRCheckout URL" required/> <label for="qrcheckout">URL for check-out</label></div></form></div></div>`;
}
export {
  _page as default
};
