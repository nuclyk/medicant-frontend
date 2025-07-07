<script>
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";
    import SelectInput from "$lib/components/SelectInput.svelte";
    import InputGroup from "$lib/components/InputGroup.svelte";

    import blocks from "$lib/assets/images/blocks.png";
    import cleanse from "$lib/assets/images/cleanse.png";
    import donationbox from "$lib/assets/images/donationbox.jpg";
    import basket from "$lib/assets/images/basket.jpg";
    import clothes from "$lib/assets/images/whitecloths.jpg";
    import laundry from "$lib/assets/images/laundryroom.jpg";
    import inspiration from "$lib/assets/images/inspiration.png";

    import { countries } from "$lib/countries.js";
    import { enhance } from "$app/forms";
    import toast from "svelte-5-french-toast";
    import Donation from "./Donation.svelte";
    import Clothes from "./Clothes.svelte";
    import Room from "./Room.svelte";
    import Tour from "./Tour.svelte";

    let { data, form } = $props();
    let showForm = $state(true);

    /*eslint-disable no-unused-vars */
    let selectedRetreatId = $state();

    let formData = $state({
        first_name: form?.formData?.first_name || "",
        last_name: form?.formData?.last_name || "",
        email: form?.formData?.email || "",
        phone: form?.formData?.phone || "",
        gender: form?.formData?.gender || "",
        nationality: form?.formData?.nationality || "",
        diet: form?.formData?.diet || "None",
        retreat_id: form?.formData?.retreat_id || (() => selectedRetreatId),
        leave_date: form?.formData?.leave_date || "",
    });
</script>

<div class="row vstack g-3 my-3">
    <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto text-center">
        <h4>Welcome to Papae Meditation Retreat</h4>
        <h6>Follow the steps below for self check-in</h6>
    </div>

    {#if showForm}
        <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Please fill out the form</h5>
                    <div class="card-text">
                        <form
                            method="POST"
                            use:enhance={() => {
                                return async ({ result }) => {
                                    if (result.type === "failure") {
                                        toast.error(
                                            result.status +
                                                " : " +
                                                result?.data?.error,
                                        );
                                    }

                                    if (result.type === "success") {
                                        toast.success(
                                            "Check-in form submitted!",
                                        );
                                        showForm = false;
                                    }

                                    if (result.type === "error") {
                                        toast.error(
                                            result.status +
                                                " : " +
                                                result?.error?.message,
                                        );
                                    }
                                };
                            }}
                        >
                            <div class="row">
                                <div class="col">
                                    <FloatingInputField
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        label="First name"
                                        bind:value={formData.first_name}
                                    />
                                </div>

                                <div class="col">
                                    <FloatingInputField
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        placeholder="Enter your last name"
                                        label="Last name"
                                        bind:value={formData.last_name}
                                    />
                                </div>
                            </div>

                            <FloatingInputField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                label="Email"
                                bind:value={formData.email}
                            />

                            <FloatingInputField
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                label="Phone"
                                bind:value={formData.phone}
                            />

                            <SelectInput
                                id="gender"
                                name="gender"
                                options={["Male", "Female"]}
                                label="Gender"
                                bind:value={formData.gender}
                            />

                            <SelectInput
                                id="nationality"
                                name="nationality"
                                options={countries}
                                property="name"
                                label="Nationality"
                                bind:value={formData.nationality}
                            />

                            <SelectInput
                                id="diet"
                                name="diet"
                                options={["None", "Vegetarian"]}
                                label="Diet"
                                bind:value={formData.diet}
                            />

                            <div class="form-floating mb-3">
                                <select
                                    class="form-select"
                                    id="retreat"
                                    name="retreat"
                                    aria-label="Select retreat"
                                    onchange={(event) =>
                                        (selectedRetreatId =
                                            event.target.value)}
                                    required
                                >
                                    <option value="">Select a retreat</option>
                                    {#each data.retreats as retreat (retreat.id)}
                                        <option value={retreat.id}
                                            >{retreat.retreat_code}
                                        </option>
                                    {/each}
                                </select>
                                <label class="form-label" for="retreat"
                                    >Retreat</label
                                >
                            </div>

                            <InputGroup
                                id="leave_date"
                                name="leave_date"
                                type="date"
                                placeholder="Enter date of leaving"
                                text="When do you plan to leave?"
                            />

                            <div class="row">
                                <div class="col">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-lg w-100"
                                        >Submit</button
                                    >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto">
            <div class="alert alert-success" role="alert">
                Thank you for filling out the form.
            </div>
        </div>
    {/if}

    <Books />
    <Donation />
    <Clothes />
    <Room />
    <Tour />
</div>
