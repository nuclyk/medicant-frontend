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

    $inspect(rooms());

    async function handleDelete(id, entity) {
        try {
            const res = await fetch(apiUrl() + entity + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
            });

            if (!res.ok) {
                error(res.status, "Could not delete the place!");
            }

            if (entity === "places") {
                let index = places().findIndex((p) => p.id === id);
                places().splice(index, 1);
            } else if (entity === "rooms") {
                let index = rooms().findIndex((r) => r.id === id);
                rooms().splice(index, 1);
            }

            toast.success("Place deleted successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }

    async function handleChange(id, entity, event) {
        let value = event.target.value;
        if (Number(value)) {
            value = Number(value);
        }

        try {
            const res = await fetch(apiUrl() + entity + "/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
                body: JSON.stringify({
                    [event.target.name]: value,
                }),
            });

            if (!res.ok) {
                error(res.status, "Could not update place");
            }

            if (entity === "places") {
                let index = places().findIndex((p) => p.id === id);
                places()[index] = await res.json();
            } else if (entity == "rooms") {
                let index = rooms().findIndex((r) => r.id === r);
                rooms()[index] = await res.json();
            }

            toast.success("Place updated successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }
</script>

<div class="container-fluid">
    <p>Add new place</p>

    <AddPlace />

    <hr class="border border-1 opacity-50" />

    <p>Edit places</p>

    <div class="row row-cols-1 row-cols-md-3 row-cols-xl-4 gy-5">
        {#each places()
            .filter((p) => p.name != "None")
            .sort((a, b) => a.name.localeCompare(b.name)) as place (place.id)}
            <div class="col">
                <div class="row mb-2">
                    <div class="col">
                        <input
                            class="form-control"
                            type="text"
                            name="name"
                            id="name"
                            value={place.name}
                            onchange={(e) =>
                                handleChange(place.id, "places", e)}
                            required
                        />
                    </div>
                </div>

                <div class="row row-cols-3 g-2">
                    <AddRoom placeID={place.id} />
                    {#each rooms()?.filter((room) => room.place_id === place.id) as room (room.id)}
                        <div class="col col-4 flex-fill">
                            <input
                                class="form-control form-control-sm text-center"
                                type="number"
                                name="number"
                                id="number"
                                value={room.number}
                                onchange={(e) =>
                                    handleChange(room.id, "rooms", e)}
                                required
                            />
                        </div>

                        <div class="col col-4 flex-fill">
                            <input
                                class="form-control form-control-sm text-center"
                                type="number"
                                name="capacity"
                                id="capacity"
                                value={room.capacity}
                                onchange={(e) =>
                                    handleChange(room.id, "rooms", e)}
                                required
                            />
                        </div>

                        <div class="col col-auto">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                                onclick={() => handleDelete(room.id, "rooms")}
                            >
                                X
                            </button>
                        </div>
                    {/each}
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary flex-fill w-100"
                            onclick={() => handleDelete(place.id, "places")}
                        >
                            Delete place
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
