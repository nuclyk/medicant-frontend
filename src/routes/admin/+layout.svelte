<script>
    let { children, data } = $props();
</script>

<div class="container-fluid">
    <div class="row row-cols-1 g-3">
        <div class="col">
            {@render children()}
        </div>
    </div>
</div>
