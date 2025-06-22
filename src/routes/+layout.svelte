<script>
    import Nav from "./Nav.svelte";
    let { children, data } = $props();
</script>

<div class="container-fluid">
    <div class="row row-cols-1 g-3">
        <div class="col">
            <Nav user={data.user}></Nav>
            {@render children()}
        </div>
    </div>
</div>
