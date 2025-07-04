<script>
    import { setContext } from "svelte";

    let { children, data } = $props();

    let sharedData = $state({
        user: data.user,
        users: data.users,
        token: data.token,
        retreats: data.retreats,
        places: data.places,
        roles: data.roles,
        apiUrl: data.apiUrl,
    });

    setContext("sharedData", sharedData);
</script>

<div class="container-fluid">
    <div class="row row-cols-1 g-3">
        <div class="col">
            {@render children()}
        </div>
    </div>
</div>
