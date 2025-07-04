<script>
    import { setContext } from "svelte";
    let { children, data } = $props();

    const user = $state(data.user);
    const users = $state(data.users);
    const roles = $state(data.roles);
    const places = $state(data.places);
    const retreats = $state(data.retreats);
    const token = $state(data.token);
    const apiUrl = $state(data.apiUrl);

    setContext("users", () => users);
    setContext("roles", () => roles);
    setContext("retreats", () => retreats);
    setContext("user", () => user);
    setContext("places", () => places);
    setContext("token", () => token);
    setContext("apiUrl", () => apiUrl);
</script>

<div class="container-fluid">
    <div class="row row-cols-1 g-3">
        <div class="col">
            {@render children()}
        </div>
    </div>
</div>
