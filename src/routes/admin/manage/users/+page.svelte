<script>
    import { getContext } from "svelte";

    let { data } = $props();

    let users = $state(data?.users?.filter((u) => u.role !== "admin"));

    let searchQuery = $state("");

    let filteredUsers = $derived(
        users?.filter((user) =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
</script>

<div class="container-fluid text-nowrap">
    <div class="row my-3 justify-content-start">
        <div class="col col-sm-4">
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
    {#each filteredUsers as user, index (index)}
        <div class="row pt-3 pb-3 g-3 row-cols-2 border-bottom">
            <div class="col">
                <h5>
                    <a
                        href={"user?id=" + user.id}
                        data-sveltekit-preload-data="off"
                        >{user.first_name} {user.last_name}</a
                    >
                </h5>
                {user.email}
            </div>
        </div>
    {/each}

    <!-- <nav -->
    <!--     aria-label="Page navigation" -->
    <!--     class="d-flex mt-3 w-100 justify-content-center" -->
    <!-- > -->
    <!--     <ul class="pagination"> -->
    <!--         <li class="page-item"> -->
    <!--             <a class="page-link" href="/">Previous</a> -->
    <!--         </li> -->
    <!--         <li class="page-item"><a class="page-link" href="/">1</a></li> -->
    <!--         <li class="page-item"><a class="page-link" href="/">2</a></li> -->
    <!--         <li class="page-item"><a class="page-link" href="/">3</a></li> -->
    <!--         <li class="page-item"><a class="page-link" href="/">Next</a></li> -->
    <!--     </ul> -->
    <!-- </nav> -->
</div>
