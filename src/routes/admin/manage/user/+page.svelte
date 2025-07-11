<script>
    import { countries } from "$lib/countries.js";
    import dayjs from "dayjs";
    import toast from "svelte-5-french-toast";
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import { page } from "$app/state";
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";
    import SelectInput from "$lib/components/SelectInput.svelte";
    import CheckoutModal from "$lib/components/CheckoutModal.svelte";
    import { handleCheckout } from "$lib/api.js";
    import { config } from "$lib/config.js";

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

    let disabled = $derived(dayjs(user?.check_out_date).year() !== 2001);

    let formData = $state({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        phone: user?.phone,
        age: user?.age,
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

<CheckoutModal
    id={user.id}
    name={userName}
    confirm={handleCheckout}
    token={token()}
/>

<form
    method="POST"
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
            }
        };
    }}
>
    <div class="row row-cols-2 g-3">
        <div class="col">
            <FloatingInputField
                type="text"
                id="firstName"
                name="first_name"
                bind:value={formData.first_name}
                placeholder="Enter your first name"
                label="First name"
            />
            <FloatingInputField
                type="text"
                id="lastName"
                name="last_name"
                bind:value={formData.last_name}
                placeholder="Enter your last name"
                label="Last name"
            />
            <FloatingInputField
                type="email"
                id="email"
                name="email"
                bind:value={formData.email}
                placeholder="Enter your email"
                label="Email"
            />
            <FloatingInputField
                type="text"
                id="phone"
                name="phone"
                bind:value={formData.phone}
                placeholder="Enter your phone number"
                label="Phone"
            />

            <FloatingInputField
                type="number"
                id="age"
                name="age"
                bind:value={formData.age}
                placeholder="Enter age"
                label="Age"
            />

            <SelectInput
                id="gender"
                name="gender"
                options={genders}
                bind:value={formData.gender}
                placeholder="Enter gender"
                label="Gender"
            />

            <SelectInput
                id="nationality"
                name="nationality"
                options={countries}
                property={"name"}
                bind:value={formData.nationality}
                placeholder="Enter nationality"
                label="Nationality"
            />

            <SelectInput
                id="diet"
                name="diet"
                options={diet}
                bind:value={formData.diet}
                placeholder="Enter your diet"
                label="Diet"
            />

            <div class="form-floating mb-3">
                <select
                    class="form-select"
                    aria-label="Role select"
                    id="role"
                    name="role"
                    bind:value={user.role}
                    placeholder="Enter your role"
                >
                    {#each roles as role (role.name)}
                        <option value={role.name} key={role.name}
                            >{role.name}</option
                        >
                    {/each}
                </select>
                <label class="form-label" for="role">Role</label>
            </div>

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

            <div class="input-group mb-3">
                <span class="input-group-text">Check-in date</span>
                <input
                    class="form-control"
                    type="datetime-local"
                    id="check_in_date"
                    name="check_in_date"
                    placeholder=""
                    bind:value={formData.check_in_date}
                />
            </div>

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

            <div class="input-group mb-3">
                <span class="input-group-text">Planned leave date</span>
                <input
                    class="form-control"
                    type="date"
                    id="leave_date"
                    name="leave_date"
                    placeholder="Leave date"
                    bind:value={formData.leave_date}
                />
            </div>

            <div
                class="d-flex w-100 justify-content-center align-content-center"
            >
                <button type="submit" class="btn btn-primary mb-3">Save</button>
            </div>

            <div
                class="d-flex w-100 justify-content-center align-content-center"
            >
                <button
                    type="button"
                    class="btn btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#checkoutModal"
                    onclick={() => {
                        userId = user.id;
                        userName = user.first_name + " " + user.last_name;
                    }}
                >
                    Check out
                </button>
            </div>
        </div>
    </div>
</form>
