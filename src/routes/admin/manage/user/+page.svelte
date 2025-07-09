<script>
    import { countries } from "$lib/countries.js";
    import dayjs from "dayjs";
    import toast from "svelte-5-french-toast";
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import { page } from "$app/state";

    let { data } = $props();

    let allUsers = getContext("users");
    let allRoles = getContext("roles");
    let allRetreats = getContext("retreats");
    let places = getContext("places");

    let user = $state(data.user);
    let roles = $derived(allRoles().filter((r) => r.name != "admin"));

    let genders = ["Female", "Male"];
    let diet = ["None", "Vegetarian"];

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
        // DATETIME field in SQLite returns special date not just null
        check_out_date:
            dayjs(user?.check_out_date).year() === 2001
                ? ""
                : dayjs(user.check_out_date).format("YYYY-MM-DD HH:mm"),
        leave_date: dayjs(user?.leave_date).format("YYYY-MM-DD"),
        place: user?.place,
    });
</script>

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
    <div class="row g-3 mt-3">
        <div class="col">
            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="text"
                    name="first_name"
                    bind:value={formData.first_name}
                    placeholder="Enter your first name"
                    required
                />
                <label for="first_name">First name</label>
            </div>

            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="text"
                    name="last_name"
                    bind:value={formData.last_name}
                    placeholder="Enter your last name"
                    required
                />
                <label for="last_name">Last name</label>
            </div>

            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="email"
                    name="email"
                    bind:value={formData.email}
                    placeholder="Enter your email"
                    required
                />
                <label for="email">Email</label>
            </div>

            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="text"
                    name="phone"
                    bind:value={formData.phone}
                    placeholder="Enter your phone number"
                    required
                />
                <label for="phone">Phone</label>
            </div>

            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="number"
                    name="age"
                    bind:value={formData.age}
                    placeholder="Enter your age"
                />
                <label for="age">Age</label>
            </div>

            <div class="form-floating mb-3">
                <select
                    class="form-select"
                    aria-label="Gender select"
                    id="gender"
                    name="gender"
                    bind:value={formData.gender}
                    placeholder="Enter your gender"
                >
                    {#each genders as gender, index (index)}
                        <option value={gender} key={index}>{gender}</option>
                    {/each}
                </select>
                <label class="form-label" for="gender">Gender</label>
            </div>

            <div class="form-floating mb-3">
                <select
                    class="form-select"
                    aria-label="Nationality select"
                    id="nationality"
                    name="nationality"
                    bind:value={formData.nationality}
                    placeholder="Enter your nationality"
                >
                    {#each countries as country, index (index)}
                        <option value={country.name} key={index}
                            >{country.name}</option
                        >
                    {/each}
                </select>
                <label class="form-label" for="nationality">Nationality</label>
            </div>

            <div class="form-floating mb-3">
                <input
                    class="form-control"
                    type="text"
                    name="diet"
                    bind:value={formData.diet}
                    placeholder="Enter your diet"
                    required
                />
                <label for="diet">Diet</label>
            </div>

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
                    disabled
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
                    {disabled}
                />
            </div>

            <div
                class="d-flex w-100 justify-content-center align-content-center"
            >
                <button type="submit" class="btn btn-primary btn-lg mb-3"
                    >Save</button
                >
            </div>
        </div>
    </div>
</form>
