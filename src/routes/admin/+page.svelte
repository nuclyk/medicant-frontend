<script>
    import InfoIcon from "./InfoIcon.svelte";
    import SortAlphaDownIcon from "$lib/components/SortAlphaDownIcon.svelte";
    import SortAlphaUpIcon from "$lib/components/SortAlphaUpIcon.svelte";
    import SortDown from "$lib/components/SortDown.svelte";
    import SortUp from "$lib/components/SortUp.svelte";

    import dayjs from "dayjs";
    import _ from "lodash";
    import toast from "svelte-5-french-toast";

    import { onMount, setContext } from "svelte";
    import { error } from "@sveltejs/kit";

    let { data } = $props();

    let users = $state(
        data?.users
            ?.filter(
                (user) =>
                    user.role != "admin" &&
                    dayjs(user.check_out_date).year() === 2001,
            )
            .sort(
                (a, b) => new Date(b.check_in_date) - new Date(a.check_in_date),
            ),
    );

    let onRetreat = $state(
        (retreatType) =>
            users?.filter((user) => {
                let retreat = findRetreat(user.retreat_id);
                if (retreat.type === retreatType && user.check_out_date == "")
                    return true;
            }).length,
    );

    let sortState = $state({
        name: true,
        check_in: true,
        leave_date: true,
        role: true,
        place: true,
    });

    let places = $derived(data?.places);

    let roles = $derived(data?.roles?.filter((role) => role.name != "admin"));

    let veg = $derived(
        users?.filter((user) => user.diet === "Vegetarian").length,
    );

    let totalInPlace = $derived.by((placeName) => {
        return users?.filter((user) => user.place === placeName).length;
    });

    let currentlyStaying = $derived(
        users?.filter((user) => !user.check_out_date).length,
    );

    let leaving = $derived(
        users?.filter(
            (user) =>
                new Date(user.leave_date).toDateString() ===
                    new Date().toDateString() && !user.check_out_date,
        ).length,
    );

    let newArrivals = $derived(
        users?.filter(
            (user) =>
                new Date(user.check_in_date).toDateString() ===
                new Date().toDateString(),
        ).length,
    );

    function countUsersInPlace(placeName) {
        return users?.filter((user) => user.place === placeName).length;
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

    async function handleCheckout(id) {
        try {
            const res = await fetch(data.apiUrl + "users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify({
                    check_out_date: dayjs().toISOString(),
                }),
            });

            if (!res.ok) {
                error(res.status, "Could not checkout the user!");
            }

            let index = users.findIndex((user) => user.id === id);
            users.splice(index, 1);
            toast.success("Participant successfuly checked out!");
        } catch (err) {
            toast.error(err.status + " : " + err.body.message);
        }
    }

    async function handleUserUpdate(id, event) {
        try {
            const res = await fetch(data.apiUrl + "users/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify({
                    [event.target.name]: event.target.value,
                }),
            });

            if (!res.ok) {
                console.log(res);
                error(res.status, "Could not update the user!");
            }

            toast.success("Updated successfuly!");
        } catch (err) {
            toast.error(err.status + " : " + err.body.message);
        }
    }

    function findRetreat(retreat_id) {
        const retreat = data.retreats.find(
            (retreat) => retreat_id === retreat.id,
        );
        return retreat;
    }
</script>

<div class="container-fluid">
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
                        Veg / Non-veg:
                        <span class="badge text-bg-primary rounded-pill">
                            {veg} / {users.length - veg}
                        </span>
                    </li>
                    <li
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        Male / Female:
                        <span class="badge text-bg-primary rounded-pill">
                            {#if users}
                                {@const male = users.filter(
                                    (user) => user.gender === "Male",
                                ).length}
                                {@const female = users.filter(
                                    (user) => user.gender === "Female",
                                ).length}
                                {male} / {female}
                            {/if}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Table of participants currently checked-in -->

    <div class="row">
        <div class="col">
            <div class="table-responsive text-nowrap">
                <table
                    class="table table-striped table-hover borderless
                align-middle text-capitalize"
                >
                    <thead>
                        <tr>
                            <th scope="col"
                                >Name <button
                                    class="btn m-0 p-0"
                                    onclick={() => {
                                        users = _.orderBy(
                                            users,
                                            "first_name",
                                            sortState.name ? "asc" : "desc",
                                        );
                                        sortState.name = !sortState.name;
                                    }}
                                >
                                    {#if sortState.name}
                                        <SortUp />
                                    {:else}
                                        <SortDown />
                                    {/if}
                                </button></th
                            >
                            <th scope="col">Retreat </th>
                            <th scope="col"
                                >Check-In
                                <button
                                    class="btn m-0 p-0"
                                    onclick={() => {
                                        users = _.orderBy(
                                            users,
                                            "check_in_date",
                                            sortState.check_in ? "asc" : "desc",
                                        );
                                        sortState.check_in =
                                            !sortState.check_in;
                                    }}
                                >
                                    {#if sortState.check_in}
                                        <SortDown />
                                    {:else}
                                        <SortUp />
                                    {/if}
                                </button>
                            </th>
                            <th scope="col">Check-Out </th>
                            <th scope="col"
                                >Leave date
                                <button
                                    class="btn m-0 p-0"
                                    onclick={() => {
                                        users = _.orderBy(
                                            users,
                                            "leave_date",
                                            sortState.leave_date
                                                ? "asc"
                                                : "desc",
                                        );
                                        sortState.leave_date =
                                            !sortState.leave_date;
                                    }}
                                >
                                    {#if sortState.leave_date}
                                        <SortDown />
                                    {:else}
                                        <SortUp />
                                    {/if}
                                </button>
                            </th>
                            <th scope="col"
                                >Room
                                <button
                                    class="btn m-0 p-0"
                                    onclick={() => {
                                        users = _.orderBy(
                                            users,
                                            "place",
                                            sortState.place ? "asc" : "desc",
                                        );
                                        sortState.place = !sortState.place;
                                    }}
                                >
                                    {#if sortState.place}
                                        <SortDown />
                                    {:else}
                                        <SortUp />
                                    {/if}
                                </button>
                                <span
                                    class="badge text-bg-primary rounded-pill"
                                    aria-label="Info"
                                    data-bs-toggle="tooltip"
                                    data-bs-html="true"
                                    data-bs-placement="top"
                                    data-bs-title="After check-in, please select correct room for the participant"
                                >
                                    ?
                                </span>
                            </th>
                            <th scope="col"
                                >Role
                                <button
                                    class="btn m-0 p-0"
                                    onclick={() => {
                                        users = _.orderBy(
                                            users,
                                            "role",
                                            sortState.role ? "asc" : "desc",
                                        );
                                        sortState.role = !sortState.role;
                                    }}
                                >
                                    {#if sortState.role}
                                        <SortDown />
                                    {:else}
                                        <SortUp />
                                    {/if}
                                </button>
                            </th>
                            <th scope="col"
                                >Donation
                                <span
                                    class="badge text-bg-primary rounded-pill"
                                    aria-label="Info"
                                    data-bs-toggle="tooltip"
                                    data-bs-html="true"
                                    data-bs-placement="top"
                                    data-bs-title="Donation 500 baht per night based on the planned leave date."
                                >
                                    ?
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each users as user, index (user.id)}
                            <tr>
                                <td>
                                    <a
                                        href={"admin/manage/users/" + user.id}
                                        class="d-inline-block text-truncate"
                                        style="max-width: 8rem;"
                                    >
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
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm w-100"
                                        onclick={() => {
                                            handleCheckout(user.id);
                                        }}
                                        >Checkout
                                    </button>
                                </td>

                                <td>
                                    <div class="input-group">
                                        <input
                                            class="form-control form-control-sm"
                                            type="date"
                                            name="leave_date"
                                            value={dayjs(
                                                user.leave_date,
                                            ).format("YYYY-MM-DD")}
                                            id="leaveDate"
                                            onchange={(event) => {
                                                user.leave_date =
                                                    event.target.value;
                                                handleUserUpdate(
                                                    user.id,
                                                    event,
                                                );
                                            }}
                                        />

                                        {#if dayjs().isSame(user.leave_date, "day") || (dayjs().isAfter(user.leave_date, "day") && user.check_out_date == "")}
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
                                                i
                                            </button>
                                        {/if}
                                    </div>
                                </td>

                                <td>
                                    <select
                                        class="form-select form-select-sm"
                                        style="min-width: 12rem;"
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
                                    <select
                                        class="form-select form-select-sm"
                                        style="min-width: 8rem;"
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

                                <td
                                    >{dayjs(user.leave_date).diff(
                                        user.check_in_date,
                                        "day",
                                    ) * 500}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
