<script>
    import { Toaster } from "svelte-5-french-toast";
    import Nav from "./Nav.svelte";
    let { children, data } = $props();
    import { config } from "$lib/config";
</script>

<Toaster position="top-center" />
<Nav user={data.user}></Nav>
{@render children()}
