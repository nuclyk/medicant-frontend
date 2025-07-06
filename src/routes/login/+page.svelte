<script>
    import { enhance } from "$app/forms";
</script>

<div class="container mt-5 w-75" style="max-width: 30rem;">
    <div class="row text-center rounded-4">
        <div class="col border rounded p-3">
            <p class="lead">Login to Medicant</p>
            <form use:enhance method="POST" action="?/login">
                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                    <label for="email">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                        class="form-control"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                    <label for="password">Password</label>
                </div>

                <div class="row">
                    <div class="col text-center">
                        <button type="submit" class="btn btn-dark btn-md"
                            >Login</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
