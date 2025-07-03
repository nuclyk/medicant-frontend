import { j as ensure_array_like, v as valueless_option, m as maybe_selected, p as push, l as bind_props, a as pop, n as copy_payload, o as assign_payload } from "../../../../chunks/index3.js";
import { F as FloatingInputField } from "../../../../chunks/FloatingInputField.js";
import { a as attr, e as escape_html } from "../../../../chunks/attributes.js";
import { c as countries } from "../../../../chunks/countries.js";
import "../../../../chunks/client.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
function SelectInput($$payload, $$props) {
  let { id, name, options, property, label, value } = $$props;
  const each_array = ensure_array_like(options);
  $$payload.out += `<div class="form-floating mb-3"><select class="form-select"${attr("id", id)}${attr("name", name)}${attr("aria-label", "Select " + name)}>`;
  $$payload.select_value = value;
  $$payload.out += `<option selected>`;
  valueless_option($$payload);
  $$payload.out += `</option><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let option = each_array[index];
    if (property) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<option${attr("value", option[property])}${maybe_selected($$payload, option[property])}>${escape_html(option[property])}</option>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<option${attr("value", option)}${maybe_selected($$payload, option)}>${escape_html(option)}</option>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  $$payload.select_value = void 0;
  $$payload.out += `</select> <label class="form-label"${attr("for", id)}>${escape_html(label)}</label></div>`;
}
function InputGroup($$payload, $$props) {
  push();
  let {
    id,
    type,
    name,
    placeholder,
    text,
    value = void 0
  } = $$props;
  $$payload.out += `<div class="input-group mb-3"><span class="input-group-text">${escape_html(text)}</span> <input class="form-control"${attr("id", id)}${attr("name", name)}${attr("type", type)}${attr("placeholder", placeholder)}${attr("value", value)} required/></div>`;
  bind_props($$props, { value });
  pop();
}
const blocks = "/_app/immutable/assets/blocks.BTSJKRrn.png";
const cleanse = "/_app/immutable/assets/cleanse.DPtM7Qsv.png";
const donationbox = "/_app/immutable/assets/donationbox.zGiDwRi2.jpg";
const basket = "/_app/immutable/assets/basket.Dsa_WVM8.jpg";
const clothes = "/_app/immutable/assets/whitecloths.CxX1lVCS.jpg";
const laundry = "/_app/immutable/assets/laundryroom.Dg8Zrl3g.jpg";
const inspiration = "/_app/immutable/assets/inspiration.C7kqiZJt.png";
function _page($$payload, $$props) {
  push();
  let { data, form } = $$props;
  let selectedRetreatId = void 0;
  let formData = {
    first_name: form?.formData?.first_name || "",
    last_name: form?.formData?.last_name || "",
    email: form?.formData?.email || "",
    phone: form?.formData?.phone || "",
    gender: form?.formData?.gender || "",
    nationality: form?.formData?.nationality || "",
    diet: form?.formData?.diet || "",
    retreat_id: form?.formData?.retreat_id || (() => selectedRetreatId),
    leave_date: form?.formData?.leave_date || ""
  };
  function formatRetreatName(retreat) {
    if (retreat) {
      return retreat.type + " (" + new Date(retreat.start_date).toLocaleDateString("en-DB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) + " to " + new Date(retreat.end_date).toLocaleDateString("en-DB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }) + ")";
    }
    return "";
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="row vstack g-3 my-3"><div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto text-center"><h4>Welcome to Papae Meditation Retreat</h4> <h6>Follow the steps below for self check-in</h6></div> `;
    {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(data.retreats);
      $$payload2.out += `<div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Please fill out the form</h5> <div class="card-text"><form method="POST"><div class="row"><div class="col">`;
      FloatingInputField($$payload2, {
        id: "first_name",
        type: "text",
        name: "first_name",
        placeholder: "Enter your first name",
        label: "First name",
        get value() {
          return formData.first_name;
        },
        set value($$value) {
          formData.first_name = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div> <div class="col">`;
      FloatingInputField($$payload2, {
        id: "last_name",
        type: "text",
        name: "last_name",
        placeholder: "Enter your last name",
        label: "Last name",
        get value() {
          return formData.last_name;
        },
        set value($$value) {
          formData.last_name = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----></div></div> `;
      FloatingInputField($$payload2, {
        id: "email",
        type: "email",
        name: "email",
        placeholder: "Enter your email",
        label: "Email",
        get value() {
          return formData.email;
        },
        set value($$value) {
          formData.email = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      FloatingInputField($$payload2, {
        id: "phone",
        type: "text",
        name: "phone",
        placeholder: "Enter your phone number",
        label: "Phone",
        get value() {
          return formData.phone;
        },
        set value($$value) {
          formData.phone = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      SelectInput($$payload2, {
        id: "gender",
        name: "gender",
        options: ["Male", "Female", "Other"],
        label: "Gender",
        get value() {
          return formData.gender;
        },
        set value($$value) {
          formData.gender = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      SelectInput($$payload2, {
        id: "nationality",
        name: "nationality",
        options: countries,
        property: "name",
        label: "Nationality",
        get value() {
          return formData.nationality;
        },
        set value($$value) {
          formData.nationality = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> `;
      SelectInput($$payload2, {
        id: "diet",
        name: "diet",
        options: ["None", "Vegetarian"],
        label: "Diet",
        get value() {
          return formData.diet;
        },
        set value($$value) {
          formData.diet = $$value;
          $$settled = false;
        }
      });
      $$payload2.out += `<!----> <div class="form-floating mb-3"><select class="form-select" id="retreat" name="retreat" aria-label="Select retreat" required><option value=""${maybe_selected($$payload2, "")}>Select a retreat</option><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let retreat = each_array[$$index];
        $$payload2.out += `<option${attr("value", retreat.id)}${maybe_selected($$payload2, retreat.id)}>${escape_html(retreat.type === "flexible" ? retreat.type : formatRetreatName(retreat))}</option>`;
      }
      $$payload2.out += `<!--]--></select> <label class="form-label" for="retreat">Retreat</label></div> `;
      InputGroup($$payload2, {
        id: "leave_date",
        name: "leave_date",
        type: "date",
        placeholder: "Enter date of leaving",
        text: "When do you plan to leave?"
      });
      $$payload2.out += `<!----> <div class="row"><div class="col"><button type="submit" class="btn btn-primary btn-lg w-100">Submit</button></div></div></form></div></div></div></div>`;
    }
    $$payload2.out += `<!--]--> <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Take your books</h5> <p class="card-text">Those books are written by Nick Keomahavong, a monk from Pa
                    Pae Meditation center.</p> <p class="card-text">It will give you all the tips to discover and practice the
                    middle way meditation. If you have never meditated before,
                    we suggest you to read them, particularly the Building
                    Blocks of Meditation (blue book).</p> <p class="card-text">You can then keep them even after the retreat.</p></div> <div class="card-body w-75 mx-auto"><figure class="figure border rounded p-3"><img${attr("src", blocks)} class="figure-img img-fluid rounded" alt="Building block of meditation"/> <figcaption class="figure-caption">Building blocks of meditaiton</figcaption></figure> <figure class="figure border rounded p-3"><img${attr("src", cleanse)} class="figure-img img-fluid rounded" alt="the budhist cleanse"/> <figcaption class="figure-caption">The Budhist Cleanse</figcaption></figure> <figure class="figure border rounded p-3"><img${attr("src", inspiration)} class="figure-img img-fluid rounded" alt="inspirational meditation"/> <figcaption class="figure-caption">Inspirational meditation for beginners</figcaption></figure></div></div></div> <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Make your donation</h5> <p class="card-text">We invite you to keep in mind that this place thrives on our
                    contributions. We suggest a donation of about 500 BAHT per
                    day, per person as it covers all food, accomodations,
                    electricity expenses... Sathu!</p> <ul class="list-group"><li class="list-group-item active">If you would like to pay by cash:</li> <li class="list-group-item">Grab an enveloppe on the main table.</li> <li class="list-group-item">Put your cash in it.</li> <li class="list-group-item">Write your name and the date.</li> <li class="list-group-item">Drop the envelope in the donation box.</li></ul> <div class="card-body w-75 mx-auto"><figure class="figure border rounded p-3"><img${attr("src", donationbox)} class="figure-img img-fluid rounded" alt="donation box"/> <figcaption class="figure-caption">Donation box</figcaption></figure></div> <ul class="list-group"><li class="list-group-item active">If you would like to make a transfer (Revolut or Wise):</li> <li class="list-group-item">Krung Thai Bank (KTB)</li> <li class="list-group-item">Account number: 982 91 00 855</li> <li class="list-group-item">Name: Phra Pawithai Shaijarernwana</li> <li class="list-group-item">Bank address: <br/> 44/42 Moo 7, Bangkhan-Khlong Luang road <br/> Sub-district: Khlong Luang <br/> District: Khlong Luang <br/> Patumthani, 10120<br/></li> <li class="list-group-item">Bank tel: 025242142</li></ul></div></div></div> <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Get your white clothes</h5> <ol class="list-group list-group-flush list-group-numbered my-3"><li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Symbolism of Purity</div> White is often associated with purity, cleanliness, and
                            simplicity. Wearing white clothing symbolizes the intention
                            to cultivate a pure and untainted mind during the retreat.
                            It reflects a commitment to inner cleanliness and the
                            pursuit of spiritual purity.</div></li> <li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Equality and Unity</div> White clothing is considered neutral and universal. By
                            having everyone wear white, regardless of their background
                            or social status, it promotes a sense of equality and
                            unity among participants. It serves as a visual reminder
                            that, in the spiritual context, everyone is equal and
                            connected.</div></li> <li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Minimizing Distractions</div> White clothing is generally simple and less likely to
                            be distracting. During retreats, the emphasis is often
                            on turning inward, reducing external stimuli, and fostering
                            an environment conducive to meditation and contemplation.
                            White attire aligns with this goal by minimizing visual
                            distractions.</div></li> <li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Energy and Aura</div> Wearing white enhances one's energy and aura. It is thought
                            to promote a sense of lightness and openness, creating
                            a conducive atmosphere for spiritual practices.</div></li> <li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Temperature Regulation</div> In practical terms, white clothing reflects sunlight
                            and helps keep the body cool, especially in warm climates.
                            This can be important during meditation retreats where
                            participants may spend extended periods in contemplative
                            practice.</div></li> <li class="list-group-item d-flex justify-content-between align-items-start"><div class="ms-2 me-auto"><div class="fw-bold">Simplicity and Detoxification</div> White clothing is often associated with simplicity. Wearing
                            simple, unadorned white attire during a retreat may symbolize
                            a commitment to simplicity in lifestyle and a temporary
                            detachment from worldly concerns.</div></li></ol> <p class="card-text">If there is no one at reception, this is where you have to
                    go to get your white clothes on the pictures below. Get one
                    shirt and one trouser which suits you. You can change your
                    clothes every day if needed, just put your dirty clothes in
                    the basket at the back of the laundry room.</p> <figure class="figure"><img${attr("src", laundry)} class="figure-img img-fluid rounded" alt="laundry"/> <figcaption class="figure-caption">To access to the laundry room, take the 2nd door after
                        the reception</figcaption></figure> <figure class="figure"><img${attr("src", clothes)} class="figure-img img-fluid rounded" alt="laundry"/> <figcaption class="figure-caption">White clothes</figcaption></figure> <figure class="figure"><img${attr("src", basket)} class="figure-img img-fluid rounded" alt="laundry"/> <figcaption class="figure-caption">Basket for dirty clothes</figcaption></figure></div></div></div> <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Get your room</h5> <p class="card-text">If there is no one at reception and no thai staff in the
                    laundry room to show you to your room, you can call the Thai
                    staff via Whatsapp :</p> <p class="card-text">- Nara : +66 90 326 5251 <br/> - P'Than : +66 84 093 8383</p></div></div></div> <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto"><div class="card"><div class="card-body"><h5 class="card-title">Join the tour</h5> <p class="card-text">For your first day here, you will be offered a tour from one
                    of our volunteers in order to show you around and to explain
                    how the meditation center works.</p> <p class="card-text">There are two tours in the afternoon. Please be at the
                    reception at 4:00 PM or 5:30 PM</p> <p class="card-text">Please be at the reception at 5:30 PM</p></div></div></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
