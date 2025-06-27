<script>
    import { page } from "$app/state";
</script>

<div class="container text-center h-100 w-100 align-content-center">
    <div class="row">
        <div class="col">
            <h4>{page.status} : {page.error.message}</h4>
        </div>
    </div>
</div>
