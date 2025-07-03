import "clsx";
import "../../../chunks/client.js";
function _page($$payload) {
  $$payload.out += `<div class="container-sm vh-100 align-content-center"><div class="row row-cols-1 text-center border border-light-subtle rounded-4 g-3 p-3"><div class="col"><p class="lead">Login to Medicant</p></div> <div class="col"><form method="POST" action="?/login"><div class="form-floating mb-3"><input class="form-control" type="email" id="email" name="email" placeholder="Enter your email" required/> <label for="email">Email</label></div> <div class="form-floating mb-3"><input class="form-control" type="password" id="password" name="password" placeholder="Enter your password" required/> <label for="password">Password</label></div> <div class="row"><div class="col text-center"><button type="submit" class="btn btn-dark btn-md">Login</button></div></div></form></div></div></div>`;
}
export {
  _page as default
};
