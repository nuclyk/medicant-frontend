<script>
    import { Toaster } from "svelte-5-french-toast";
    let { children } = $props();
</script>

<Toaster position="top-center" />
{@render children()}
