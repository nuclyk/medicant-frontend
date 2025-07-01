<script>
    import { API } from "$lib/api";
    import { error } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import toast from "svelte-5-french-toast";

    let { data } = $props();
    let places = $state(data.places.filter((place) => place.name != "None"));
    let placeName = $state("");
    let placeCapacity = $state();

    async function handleDelete(name) {
        try {
            const res = await fetch(API + "places/" + name, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
            });

            if (!res.ok) {
                error(res.status, "Could not delete the place!");
            }

            let index = places.findIndex((place) => place.name === name);
            places.splice(index, 1);
            toast.success("Place deleted successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }

    async function handleChange(name, event) {
        try {
            const res = await fetch(API + "places/" + name, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data.token,
                },
                body: JSON.stringify({
                    [event.target.name]: event.target.value,
                }),
            });

            if (!res.ok) {
                error(res.status, "Could not update place");
            }

            let index = places.findIndex((place) => place.name === name);
            places[index] = await res.json();
            toast.success("Place updated successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }
</script>

<div class="container">
    <form
        method="POST"
        use:enhance={() => {
            return ({ result }) => {
                if (result.type !== "success") {
                    toast.error(result.status + " : " + result.data.error);
                } else {
                    places.push(result.data);
                    toast.success("Place added successfuly!");
                }
            };
        }}
    >
        <p>Add new place</p>
        <div class="row bg-light border rounded-1 p-2 g-2">
            <div class="col-xxl flex-fill">
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="Add new place"
                    bind:value={placeName}
                    required
                />
            </div>
            <div class="col-xxl flex-fill">
                <input
                    class="form-control"
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    bind:value={placeCapacity}
                    required
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
    {#each places as place (place.name)}
        <div class="row g-2 bg-light border rounded-1 p-2 my-2">
            <div class="col-lg-auto flex-fill">
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    value={place.name}
                    onchange={(e) => handleChange(place.name, e)}
                    required
                />
            </div>
            <div class="col-lg-auto flex-fill">
                <input
                    class="form-control"
                    type="number"
                    name="capacity"
                    value={place.capacity}
                    onchange={(e) => handleChange(place.name, e)}
                    required
                />
            </div>
            <div class="col-lg-auto">
                <button
                    type="button"
                    class="btn btn-dark flex-fill w-100"
                    onclick={() => handleDelete(place.name)}>Delete</button
                >
            </div>
        </div>
    {/each}
</div>
