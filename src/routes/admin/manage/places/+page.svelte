<script>
    import { error } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import toast from "svelte-5-french-toast";
    import { getContext } from "svelte";

    let places = $state(getContext("places"));
    let users = $state(getContext("users"));
    let token = getContext("token");
    let apiUrl = getContext("apiUrl");

    let placeName = $state("");
    let placeRoom = $state("");
    let placeCapacity = $state();

    async function handleDelete(id) {
        try {
            const res = await fetch(apiUrl() + "places/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
            });

            if (!res.ok) {
                error(res.status, "Could not delete the place!");
            }

            let index = places().findIndex((place) => place.id === id);

            places().splice(index, 1);

            toast.success("Place deleted successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }

    async function handleChange(id, event) {
        try {
            const res = await fetch(apiUrl() + "places/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
                body: JSON.stringify({
                    [event.target.name]: event.target.value,
                }),
            });

            if (!res.ok) {
                error(res.status, "Could not update place");
            }

            let index = places().findIndex((p) => p.id === id);
            places()[index] = await res.json();

            toast.success("Place updated successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }
</script>

<div class="container-fluid">
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
        <p>Add new place</p>
        <div class="row bg-light border rounded-1 p-2 g-2">
            <div class="col-auto">
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="Place name"
                    bind:value={placeName}
                    required
                />
            </div>
            <div class="col">
                <input
                    class="form-control"
                    type="text"
                    name="room"
                    placeholder="Room"
                    bind:value={placeRoom}
                />
            </div>
            <div class="col">
                <input
                    class="form-control"
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    bind:value={placeCapacity}
                />
            </div>
            <div class="col-xxl">
                <button type="submit" class="btn btn-dark flex-fill w-100"
                    >Add</button
                >
            </div>
        </div>
    </form>

    <hr class="border border-1 opacity-50" />

    <p>Edit places</p>
    {#each places()
        .filter((p) => p.name != "None")
        .sort((a, b) => a.name.localeCompare(b.name)) as place (place.id)}
        <div class="row g-2 bg-light border rounded-1 p-2 my-2">
            <div class="col-auto input-group">
                <span class="input-group-text">Name </span>
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    value={place.name}
                    onchange={(e) => handleChange(place.id, e)}
                    required
                />
            </div>
            <div class="col input-group">
                <span class="input-group-text">Room </span>
                <input
                    class="form-control"
                    type="number"
                    name="room"
                    value={place.room}
                    onchange={(e) => handleChange(place.id, e)}
                    required
                />
            </div>
            <div class="col input-group">
                <span class="input-group-text">Capacity </span>
                <input
                    class="form-control"
                    type="number"
                    name="capacity"
                    value={place.capacity}
                    onchange={(e) => handleChange(place.id, e)}
                    required
                />
            </div>
            <div class="col-lg-auto">
                <button
                    type="button"
                    class="btn btn-dark flex-fill w-100"
                    onclick={() => handleDelete(place.id)}>Delete</button
                >
            </div>
        </div>
    {/each}
</div>
