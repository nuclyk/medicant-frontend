<script>
    import { fade } from "svelte/transition";
    import { countries } from "$lib/countries.js";
    import { enhance } from "$app/forms";
    import dayjs from "dayjs";
    let { data } = $props();
    let showForm = $state(true);
    let selectedRetreatId = $state(0);

    function formatRetreatName(retreat) {
        if (retreat) {
            return (
                retreat.type +
                " (" +
                new Date(retreat.start_date).toLocaleDateString("en-DB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }) +
                " to " +
                new Date(retreat.end_date).toLocaleDateString("en-DB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }) +
                ")"
            );
        }
        return "";
    }
</script>

<div class="row row-cols-1 g-3 mt-2">
    <div class="col">
        <h3>Check-in</h3>
    </div>
    <div class="col">
        {#if showForm}
            <form
                method="POST"
                transition:fade
                use:enhance={(e) => {
                    showForm = false;
                }}
            >
                <div class="row">
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input
                                class="form-control"
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                required
                            />
                            <label for="firstName">First name</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-floating mb-3">
                            <input
                                class="form-control"
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                required
                            />
                            <label for="lastName">Last name</label>
                        </div>
                    </div>
                </div>
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
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        required
                    />
                    <label for="phone">Phone</label>
                </div>
                <div class="form-floating mb-3">
                    <select
                        class="form-select"
                        aria-label="Gender select"
                        id="gender"
                        name="gender"
                    >
                        <option selected></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <label class="form-label" for="gender">Gender</label>
                </div>
                <div class="form-floating mb-3">
                    <select
                        class="form-select"
                        aria-label="Gender select"
                        id="nationality"
                        name="nationality"
                    >
                        <option selected></option>
                        {#each countries as country}
                            <option value={country.name}>{country.name}</option>
                        {/each}
                    </select>
                    <label class="form-label" for="nationality"
                        >Nationality</label
                    >
                </div>

                <div class="form-floating mb-3">
                    <select
                        class="form-select"
                        id="retreat"
                        name="retreat"
                        aria-label="Select retreat"
                        onchange={(event) => {
                            selectedRetreatId = event.target.value;
                        }}
                    >
                        {#each data.retreats as retreat}
                            <option value={retreat.id}>
                                {retreat.type === "flexible"
                                    ? retreat.type
                                    : formatRetreatName(retreat)}
                            </option>
                        {/each}
                    </select>
                    <label class="form-label" for="retreat">Retreat</label>
                </div>

                <div class="input-group mb-3">
                    <span class="input-group-text"
                        >When do you plan to leave?</span
                    >
                    <input
                        class="form-control"
                        type="date"
                        id="leaveDate"
                        name="leaveDate"
                        placeholder="Enter date of leaving"
                        required
                    />
                </div>
                <div class="row">
                    <div class="col">
                        <button type="submit" class="btn btn-primary btn-lg"
                            >Submit</button
                        >
                    </div>
                </div>
            </form>
        {:else}
            <div class="row align-items-center justify-items-center">
                <div class="col">
                    <div class="alert alert-success" role="alert">
                        Thank you for filling out the form. Please continue with
                        the steps below.
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
