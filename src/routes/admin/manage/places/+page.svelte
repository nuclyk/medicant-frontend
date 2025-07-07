<script>
    import { error } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import toast from "svelte-5-french-toast";
    import { getContext } from "svelte";
    import AddPlace from "./AddPlace.svelte";
    import AddRoom from "./AddRoom.svelte";
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";

    let users = $state(getContext("users"));
    let places = $state(getContext("places"));
    let rooms = getContext("rooms");

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

<div class="container">
    <p>Add new place</p>

    <AddPlace />

    <hr class="border border-1 opacity-50" />

    {#each places()
        .filter((p) => p.name != "None")
        .sort((a, b) => a.name.localeCompare(b.name)) as place (place.id)}
        <div class="row row-cols-3 g-1 p-2 border rounded mb-4">
            <div class="col-12">
                <label for="name" class="small">Place</label>
                <input
                    class="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={place.name}
                    onchange={(e) => handleChange(place.id, e)}
                    required
                />
            </div>

            <div class="col col-6 flex-fill small">Room</div>
            <div class="col col-6 flex-fill small">Beds</div>

            {#each rooms()?.filter((room) => room.place_id === place.id) as room (room.id)}
                <div class="col col-4 flex-fill">
                    <input
                        class="form-control form-control-sm text-center"
                        type="number"
                        name="room"
                        id="room"
                        value={room.number}
                        onchange={(e) => handleChange(place.id, e)}
                        required
                    />
                </div>

                <div class="col col-4 flex-fill">
                    <input
                        class="form-control form-control-sm text-center"
                        type="number"
                        name="room"
                        id="room"
                        value={room.capacity}
                        onchange={(e) => handleChange(place.id, e)}
                        required
                    />
                </div>

                <div class="col col-auto">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger flex-fill w-100"
                        onclick={() => handleDelete(place.id)}
                    >
                        X
                    </button>
                </div>
            {/each}
            <AddRoom />
        </div>
    {/each}
</div>
