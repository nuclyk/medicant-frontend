<script>
    import InfoIcon from "./InfoIcon.svelte";
    import dayjs from "dayjs";

    import { onMount } from "svelte";
    import { API } from "$lib/api";

    let { data } = $props();

    let users = $state(
        data?.users?.filter(
            (user) => user.role != "admin" && user.check_out_date === "",
        ),
    );

    let places = $derived(data?.places);
    let roles = $derived(data?.roles?.filter((role) => role.name != "admin"));

    let veg = $derived(
        users.filter((user) => user.diet === "Vegetarian").length,
    );

    let totalInPlace = $derived.by((placeName) => {
        return users.filter((user) => user.place === placeName).length;
    });

    function countUsersInPlace(placeName) {
        return users.filter((user) => user.place === placeName).length;
    }

    onMount(() => {
        const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]',
        );

        // eslint-disable-next-line no-unused-vars
        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
        );
    });

    let currentlyStaying = $derived(
        users.filter((user) => !user.check_out_date).length,
    );

    let onRetreat = $state(
        (retreatType) =>
            users.filter((user) => {
                let retreat = findRetreat(user.retreat_id);
                if (retreat.type === retreatType && user.check_out_date == "")
                    return true;
            }).length,
    );

    let leaving = $derived(
        users.filter(
            (user) =>
                new Date(user.leave_date).toDateString() ===
                    new Date().toDateString() && !user.check_out_date,
        ).length,
    );

    let newArrivals = $derived(
        users.filter(
            (user) =>
                new Date(user.check_in_date).toDateString() ===
                new Date().toDateString(),
        ).length,
    );

    async function handleCheckout(id) {
        try {
            const response = await fetch(API + "users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify({
                    check_out_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                    leave_date: dayjs().format("YYYY-MM-DD"),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error when updating the user: ", error);
            throw error;
        }

        location.reload();
    }

    async function handleUserUpdate(id, event) {
        try {
            const response = await fetch(API + "users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify({
                    [event.target.name]: event.target.value,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error when updating the user: ", error);
            throw error;
        }
    }

    function findRetreat(retreat_id) {
        const retreat = data.retreats.find(
            (retreat) => retreat_id === retreat.id,
        );
        return retreat;
    }
</script>

<div class="container">
    <div class="row mb-3 mt-3 g-3 vh-25">
        <div class="col">
            <div class="card">
                <div class="card-header">Participants</div>
                <ul class="list-group list-group-flush text-nowrap">
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Currently staying:
                        <span class="badge text-bg-primary rounded-pill">
                            {currentlyStaying}</span
                        >
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Arrived today:
                        <span class="badge text-bg-primary rounded-pill">
                            {newArrivals}
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Leaving today:
                        <span class="badge text-bg-primary rounded-pill">
                            {leaving}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">Retreats</div>
                <ul class="list-group list-group-flush text-nowrap">
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Next retreat date:
                        <span class="badge text-bg-primary rounded-pill">
                            ?
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Flexible retreat:
                        <span class="badge text-bg-primary rounded-pill">
                            {onRetreat("flexible")}
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Fixed reatreat:
                        <span class="badge text-bg-primary rounded-pill">
                            {onRetreat("fixed")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">Stats</div>
                <ul class="list-group list-group-flush text-nowrap">
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Participants / Volunteers:
                        <span class="badge text-bg-primary rounded-pill">
                            {#if users}
                                {@const volunteers = users.filter(
                                    (user) => user.role === "volunteer",
                                ).length}
                                {users.length - volunteers} / {volunteers}
                            {/if}
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Vegetarian:
                        <span class="badge text-bg-primary rounded-pill">
                            {veg}
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Male / Female / Other:
                        <span class="badge text-bg-primary rounded-pill">
                            {#if users}
                                {@const male = users.filter(
                                    (user) => user.gender === "Male",
                                ).length}
                                {@const female = users.filter(
                                    (user) => user.gender === "Female",
                                ).length}
                                {@const other = users.filter(
                                    (user) => user.gender === "Other",
                                ).length}
                                {male} / {female} / {other}
                            {/if}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="table-responsive text-nowrap">
                <table
                    class="table table-striped table-hover table-borderless
                align-middle text-capitalize"
                >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Retreat</th>
                            <th scope="col">Check-In</th>
                            <th scope="col">Check-Out</th>
                            <th scope="col">Leave date</th>
                            <th scope="col">Room</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Role</th>
                            <th scope="col">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users as user, index (user.id)}
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <a href={"admin/manage/users/" + user.id}>
                                        {user.first_name}
                                        {user.last_name}
                                    </a>
                                </td>
                                <td>
                                    {findRetreat(user.retreat_id).retreat_code}
                                </td>
                                <td>
                                    {dayjs(user.check_in_date).format(
                                        "DD MMM HH:mm",
                                    )}
                                </td>
                                <td>
                                    {#if user.check_out_date != ""}
                                        {dayjs(user.check_out_date).format(
                                            "DD MMM HH:mm",
                                        )}
                                    {:else}
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-sm"
                                            onclick={() => {
                                                handleCheckout(user.id);
                                            }}
                                            >Checkout
                                        </button>
                                    {/if}
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input
                                            class="form-control flex-fill"
                                            type="date"
                                            name="leave_date"
                                            value={user.leave_date}
                                            onchange={(event) => {
                                                user.leave_date =
                                                    event.target.value;
                                                handleUserUpdate(
                                                    user.id,
                                                    event,
                                                );
                                            }}
                                            disabled={user.check_out_date != ""}
                                        />

                                        {#if dayjs().isAfter(user.leave_date, "day") && user.check_out_date == ""}
                                            <button
                                                aria-label="Info"
                                                type="button"
                                                class="btn btn-warning btn-sm"
                                                data-bs-toggle="tooltip"
                                                data-bs-html="true"
                                                data-bs-placement="top"
                                                data-bs-title="<p>Check if the participant is still in the retreat.
                                        As per leave date, they should be checked out already.</p><p>Change the leave date
                                        or check them out.</p>"
                                            >
                                                <InfoIcon></InfoIcon>
                                            </button>
                                        {/if}
                                    </div>
                                </td>
                                <td>
                                    <select
                                        class="form-control w-auto"
                                        aria-label="Place select"
                                        name="place"
                                        onchange={(event) => {
                                            handleUserUpdate(user.id, event);
                                            user.place = event.target.value;
                                        }}
                                        value={user.place}
                                    >
                                        {#each places as place (place.name)}
                                            {@const totalInPlace = users.filter(
                                                (u) => u.place === place.name,
                                            ).length}

                                            <option value={place.name}>
                                                {place.name}

                                                {#if place.name !== "None"}
                                                    ({totalInPlace}/{place.capacity})
                                                {/if}
                                            </option>
                                        {/each}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        class="form-control w-auto"
                                        size="11"
                                        type="text"
                                        name="phone"
                                        value={user.phone}
                                        onchange={(event) => {
                                            handleUserUpdate(user.id, event);
                                        }}
                                    />
                                </td>
                                <td>
                                    <select
                                        class="form-select w-auto"
                                        aria-label="Role select"
                                        name="role"
                                        onchange={(event) => {
                                            user.role = event.target.value;
                                            handleUserUpdate(user.id, event);
                                        }}
                                    >
                                        <option value={user.role} selected
                                            >{user.role}</option
                                        >
                                        {#each roles as role (role.name)}
                                            <option value={role.name}>
                                                {role.name}
                                            </option>
                                        {/each}
                                    </select>
                                </td>
                                <td>{user.gender}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
