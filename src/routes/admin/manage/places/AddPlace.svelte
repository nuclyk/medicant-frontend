<script>
    let placeName = $state("");
</script>

<form
    method="POST"
    use:enhance={() => {
        return ({ result }) => {
            if (result.type !== "success") {
                toast.error(result.status + " : " + result.data.error);
            } else {
                places().push(result.data);
                toast.success("Place added successfuly!");
            }
        };
    }}
>
    <div class="row g-2">
        <div class="col-9 col-auto col-xxl-4">
            <input
                class="form-control"
                type="text"
                name="name"
                placeholder="Name of the new place"
                bind:value={placeName}
                required
            />
        </div>

        <div class="col col-3">
            <button type="submit" class="btn btn-dark w-100">Add</button>
        </div>
    </div>
</form>
