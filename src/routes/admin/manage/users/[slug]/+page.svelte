<script>
    import { countries } from "$lib/countries.js";
    import dayjs from "dayjs";
    import utc from "dayjs/plugin/utc";
    import { page } from "$app/state";
    import toast from "svelte-5-french-toast";
    import { enhance } from "$app/forms";

    let { data, error } = $props();
    let user = $state(data.user);
    let roles = $state(data.roles);
    let retreats = $state(data.retreats);
    let places = $state(data.places);
    let retreat = retreats.find((retreat) => retreat.id === user.retreat_id);
    let genders = ["Female", "Male", "Other"];
</script>

<form
    method="POST"
    use:enhance={() => {
        return ({ result }) => {
            if (result.type !== "success") {
                toast.error(result.status + " : Could not update the user!");
            } else {
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
                    bind:value={user.first_name}
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
                    bind:value={user.last_name}
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
                    bind:value={user.email}
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
                    bind:value={user.phone}
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
                    bind:value={user.age}
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
                    bind:value={user.gender}
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
                    bind:value={user.nationality}
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
                    bind:value={user.diet}
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
                    bind:value={retreat.id}
                    placeholder="Enter your role"
                >
                    {#each retreats as retreat (retreat.id)}
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
                    bind:value={user.place}
                    placeholder="Enter your place"
                >
                    {#each places as place (place.name)}
                        <option value={place.name} key={place.id}
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
                    type="datetime"
                    id="check_in_date"
                    name="check_in_date"
                    placeholder=""
                    value={dayjs(user.check_in_date).format("YYYY-MM-DD HH:mm")}
                    disabled
                />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Check-out date</span>
                <input
                    class="form-control"
                    type="datetime"
                    id="check_out_date"
                    name="check_out_date"
                    placeholder=""
                    value={dayjs(user.check_out_date).format(
                        "YYYY-MM-DD HH:mm",
                    )}
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
                    value={dayjs(user.leave_date).format("YYYY-MM-DD")}
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
