<script>
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import toast from "svelte-5-french-toast";

    let placeName = $state("");
    let places = getContext("places");
</script>

<form
    method="POST"
    action="?/addPlace"
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
    <div class="row row-cols-2 g-2">
        <div class="col col-10 col-sm-6">
            <input
                class="form-control"
                type="text"
                name="name"
                placeholder="Name of the new place"
                bind:value={placeName}
                required
            />
        </div>

        <div class="col col-auto">
            <button type="submit" class="btn btn btn-outline-primary">+</button>
        </div>
    </div>
</form>
