<script>
    import { getContext } from "svelte";
    import dayjs from "dayjs";
    import _ from "lodash";
    import { invalidate } from "$app/navigation";

    let { data } = $props();

    let users = $derived(data?.users?.filter((u) => u.role !== "admin"));
    let { participants_count } = data.stats;

    let searchQuery = $state("");

    let filteredUsers = $derived(
        users?.filter(
            (user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.first_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                user.last_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        ),
    );

    let pages = $derived(Math.floor(participants_count / 50));
    let currentPage = $derived(data.page);
    let prevPage = $derived(currentPage > 0 ? currentPage - 1 : currentPage);
    let nextPage = $derived(currentPage < pages ? currentPage + 1 : pages);
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col">
            <nav aria-label="...">
                <ul class="pagination pagination-sm justify-content-center">
                    <li class="page-item {!currentPage ? 'disabled' : ''}">
                        <a href={"?page=" + prevPage} class="page-link"
                            >Previous</a
                        >
                    </li>
                    {#each Array.from({ length: pages + 1 }) as _, index}
                        <li
                            class="page-item {index == currentPage
                                ? 'active'
                                : ''}"
                        >
                            <a class="page-link" href="?page={index}">{index}</a
                            >
                        </li>
                    {/each}

                    <li
                        class="page-item {currentPage == pages
                            ? 'disabled'
                            : ''}"
                    >
                        <a class="page-link" href={"?page=" + nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="row my-3 justify-content-center mx-auto mx-auto">
        <div class="col col-6">
            <input
                type="search"
                name="search"
                id="search"
                class="form-control"
                placeholder="Search by name or email..."
                bind:value={searchQuery}
            />
        </div>
    </div>

    <div class="row g-4">
        {#each _.sortBy( filteredUsers, ["first_name", "last_name"], ) as user, index (index)}
            <div class="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 g-4 p-2">
                <div class="vstack border rounded p-2">
                    <div>
                        <a
                            href={"user?id=" + user.id}
                            data-sveltekit-preload-data="off"
                            >{user.first_name} {user.last_name}</a
                        >
                    </div>
                    <div>
                        Email: {user.email}
                    </div>
                    <div>
                        <span>Is checked in?</span>
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
                    <div>
                        Checkin: {dayjs(user.check_in_date).format(
                            "DD/MM/YY HH:mm",
                        )}
                    </div>
                    <div>
                        Checkout: {user.check_out_date
                            ? dayjs(user?.check_out_date).format(
                                  "DD/MM/YY HH:mm",
                              )
                            : ""}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
