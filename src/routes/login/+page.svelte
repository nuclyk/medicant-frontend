<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    let { data } = $props();
</script>

<div class="row">
    <div class="col">
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
                <div class="col">
                    <button type="submit" class="btn btn-primary btn-lg"
                        >Submit</button
                    >
                </div>
            </div>
        </form>
    </div>
</div>
