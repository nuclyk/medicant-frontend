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

    const user = $state(data.user);
    const users = $state(data.users);
    const roles = $state(data.roles);
    const retreats = $state(data.retreats);
    const places = $state(data.places);
    const token = $state(data.token);
    const apiUrl = $state(data.apiUrl);

    setContext("users", () => users);
    setContext("roles", () => roles);
    setContext("retreats", () => retreats);
    setContext("user", () => user);
    setContext("places", () => places);
    setContext("token", () => token);
    setContext("apiUrl", () => apiUrl);

    setContext("sharedData", sharedData);
</script>

<div class="container-fluid">
    <div class="row row-cols-1 g-3">
        <div class="col">
            {@render children()}
        </div>
    </div>
</div>
