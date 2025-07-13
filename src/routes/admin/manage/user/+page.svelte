<script>
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";
    import SelectInput from "$lib/components/SelectInput.svelte";
    import CheckoutModal from "$lib/components/CheckoutModal.svelte";
    import dayjs from "dayjs";
    import toast from "svelte-5-french-toast";
    import { countries } from "$lib/countries.js";
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import { page } from "$app/state";
    import { handleCheckout } from "$lib/api.js";
    import { config } from "$lib/config.js";
    import { invalidateAll } from "$app/navigation";

    let { data } = $props();

    let allUsers = getContext("users");
    let allRoles = getContext("roles");
    let allRetreats = getContext("retreats");
    let places = getContext("places");
    let token = getContext("token");

    let user = $state(data.user);
    let roles = $derived(allRoles().filter((r) => r.name != "admin"));
    let userName = $derived(user.first_name + " " + user.last_name);

    let genders = ["Female", "Male"];
    let diet = ["Meat", "Vegetarian"];

    let disabled = $derived(user.is_checked_in);

    let formData = $state({
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone: user?.phone,
        gender: user?.gender,
        nationality: user?.nationality,
        diet: user?.diet,
        role: user?.role,
        retreat_id: user?.retreat_id,
        check_in_date: dayjs(user?.check_in_date).format("YYYY-MM-DD HH:mm"),
        check_out_date: dayjs(user?.check_out_date).format("YYYY-MM-DD HH:mm"),
        leave_date: dayjs(user?.leave_date).format("YYYY-MM-DD"),
        place: user?.place,
        room_id: user?.room_id,
    });
</script>

<form
    method="POST"
    action="?/save"
    use:enhance={() => {
        return ({ result }) => {
            if (result.type !== "success") {
                toast.error(result.status + " : " + result.data.error);
            } else {
                let index = allUsers().findIndex(
                    (u) => u.id === result.data.id,
                );

                allUsers()[index] = result.data;
                toast.success("User updated successfuly!");
                location.reload();
            }
        };
    }}
>
    <input
        class="visually-hidden"
        type="text"
        id="id"
        name="id"
        bind:value={user.id}
        readonly
        label="Test"
    />

    <div class="hstack mb-2">
        <div class="">
            ID: {user.id}
        </div>

        <div class="d-flex px-2" style="height: 30px;">
            <div class="vr"></div>
        </div>

        <div class="text-nowrap">
            Checked-in:

            {#if user.is_checked_in}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check-square-fill text-success"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square-fill text-danger"
                    viewBox="0 0 16 16"
                >
                    <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"
                    />
                </svg>
            {/if}
        </div>
    </div>

    <hr />

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        <div class="col">
            <FloatingInputField
                type="text"
                id="firstName"
                name="first_name"
                bind:value={formData.first_name}
                placeholder="Enter your first name"
                label="First name"
            />
        </div>

        <div class="col">
            <FloatingInputField
                type="text"
                id="lastName"
                name="last_name"
                bind:value={formData.last_name}
                placeholder="Enter your last name"
                label="Last name"
            />
        </div>

        <div class="col">
            <FloatingInputField
                type="email"
                id="email"
                name="email"
                bind:value={formData.email}
                placeholder="Enter your email"
                label="Email"
            />
        </div>

        <div class="col">
            <FloatingInputField
                type="text"
                id="phone"
                name="phone"
                bind:value={formData.phone}
                placeholder="Enter your phone number"
                label="Phone"
            />
        </div>

        <div class="col">
            <SelectInput
                id="gender"
                name="gender"
                options={genders}
                bind:value={formData.gender}
                placeholder="Enter gender"
                label="Gender"
            />
        </div>

        <div class="col">
            <SelectInput
                id="nationality"
                name="nationality"
                options={countries}
                property={"name"}
                bind:value={formData.nationality}
                placeholder="Choose nationality"
                label="Nationality"
            />
        </div>

        <div class="col">
            <SelectInput
                id="diet"
                name="diet"
                options={diet}
                bind:value={formData.diet}
                placeholder="Choose diet"
                label="Diet"
            />
        </div>

        <div class="col">
            <SelectInput
                id="role"
                name="role"
                options={roles}
                property={"name"}
                bind:value={formData.role}
                placeholder="Choose role"
                label="Role"
            />
        </div>

        <div class="col">
            <div class="form-floating mb-3">
                <select
                    class="form-select"
                    aria-label="Retreat select"
                    id="retreat"
                    name="retreat"
                    bind:value={formData.retreat_id}
                    placeholder="Enter your role"
                >
                    {#each allRetreats() as retreat (retreat.id)}
                        <option value={retreat.id} key={retreat.id}
                            >{retreat.retreat_code}</option
                        >
                    {/each}
                </select>
                <label class="form-label" for="retreat">Retreat</label>
            </div>
        </div>

        <div class="col">
            <div class="form-floating mb-3">
                <select
                    class="form-select"
                    aria-label="Retreat select"
                    id="place"
                    name="place"
                    bind:value={formData.place}
                    placeholder="Enter your place"
                >
                    {#each places() as place (place.id)}
                        <option value={place.id} key={place.id}
                            >{place.name}</option
                        >
                    {/each}
                </select>
                <label class="form-label" for="place">Place</label>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text">Check-in date</span>
                <input
                    class="form-control"
                    type="datetime-local"
                    id="check_in_date"
                    name="check_in_date"
                    placeholder=""
                    bind:value={formData.check_in_date}
                    disabled
                />
            </div>
        </div>

        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text">Check-out date</span>
                <input
                    class="form-control"
                    type="datetime-local"
                    id="check_out_date"
                    name="check_out_date"
                    placeholder=""
                    bind:value={formData.check_out_date}
                    disabled
                />
            </div>
        </div>

        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text">Planned leave date</span>
                <input
                    class="form-control"
                    type="date"
                    id="leave_date"
                    name="leave_date"
                    placeholder="Leave date"
                    bind:value={formData.leave_date}
                    readonly={!user.is_checked_in}
                />
            </div>
        </div>
    </div>

    <div class="row justify-content-center mt-3">
        <div class="col col-6 text-center">
            <button type="submit" class="btn btn-primary mb-3">Save</button>
            {#if user.is_checked_in}
                <button
                    type="submit"
                    class="btn btn-outline-danger mb-3"
                    formaction="/form/checkout?/checkout">Check-out</button
                >
            {:else}
                <button
                    type="submit"
                    class="btn btn-outline-success mb-3"
                    formaction="/form/checkin?/checkin">Check-in</button
                >
            {/if}
        </div>
    </div>
</form>
