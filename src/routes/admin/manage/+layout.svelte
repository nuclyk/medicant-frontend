<script>
    import Tabs from "./Tabs.svelte";
    let { children } = $props();
</script>

<div class="container mt-3">
    <div class="card">
        <div class="card-header">
            <Tabs></Tabs>
        </div>
        <div class="card-body">
            {@render children()}
        </div>
    </div>
</div>
