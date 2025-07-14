<script>
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";

    import { fade } from "svelte/transition";
    import { enhance } from "$app/forms";
    import toast from "svelte-5-french-toast";

    let showForm = $state(true);
</script>

<div class="container text-center">
    {#if showForm}
        <div class="row mx-auto justify-content-center">
            <div class="col">
                <h3>Checkout Form</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                Please enter the same details that you have used for checkin.
            </div>
        </div>

        <div class="row mx-auto justify-content-center p-4">
            <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
                <form
                    method="POST"
                    action="?/checkout"
                    use:enhance={() => {
                        return ({ result }) => {
                            console.log(result);
                            if (result.type === "failure") {
                                toast.error(
                                    result.status + " : " + result?.data?.error,
                                );
                                showForm = true;
                            }

                            if (result.type === "success") {
                                toast.success("Check-in form submitted!");
                                showForm = false;
                            }
                        };
                    }}
                >
                    <FloatingInputField
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        label="Email"
                    />
                    <button type="submit" class="btn btn-primary btn-lg mt-2"
                        >Check out</button
                    >
                </form>
            </div>
        </div>
    {:else}
        <div class="row mx-auto justify-content-center p-4">
            <div class="col-12 col-sm-6 col-lg-5 col-xl-4">
                <div class="alert alert-success" role="alert">
                    <p>
                        You have been checked-out. If you haven't done so
                        already, please help us make the retreat better and
                        share your

                        <a
                            href="https://docs.google.com/forms/d/13bFgq_tOMwPFlX2VXiOH461XZrEBO84In_53hvDI_ug"
                            target="_blank"
                        >
                            FEEDBACK
                        </a>.
                    </p>

                    <p>See you next time! :)</p>
                </div>
            </div>
        </div>
    {/if}
</div>
