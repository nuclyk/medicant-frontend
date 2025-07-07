<script>
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";
    import { enhance } from "$app/forms";
</script>

<div class="container mt-5 w-75" style="max-width: 30rem;">
    <div class="row text-center rounded-4">
        <div class="col border rounded p-3">
            <p class="lead">Login to Medicant</p>

            <form use:enhance method="POST" action="?/login">
                <FloatingInputField
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    label="Email"
                />

                <FloatingInputField
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                />
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
