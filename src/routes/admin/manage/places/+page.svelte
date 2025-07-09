<script>
    import _ from "lodash";
    import toast from "svelte-5-french-toast";

    import AddPlace from "./AddPlace.svelte";
    import AddRoom from "./AddRoom.svelte";
    import FloatingInputField from "$lib/components/FloatingInputField.svelte";

    import { getContext } from "svelte";
    import { handleDelete, handleChange } from "$lib/api.js";

    let users = getContext("users");
    let places = getContext("places");
    let rooms = getContext("rooms");

    let token = getContext("token");
    let apiUrl = getContext("apiUrl");

    let placeName = $state("");
    let placeRoom = $state("");
    let placeCapacity = $state();
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
                            onchange={(event) => {
                                handleChange(place.id, "places", event, token);

                                let index = _.findIndex(places(), {
                                    id: place.id,
                                });

                                places()[index].name = event.target.value;
                            }}
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
                                onchange={(event) => {
                                    handleChange(
                                        room.id,
                                        "rooms",
                                        event,
                                        token,
                                    );

                                    let index = _.findIndex(rooms(), {
                                        id: room.id,
                                    });

                                    rooms()[index].number = event.target.value;
                                }}
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
                                onchange={(event) => {
                                    handleChange(
                                        room.id,
                                        "rooms",
                                        event,
                                        token,
                                    );

                                    let index = _.findIndex(rooms(), {
                                        id: room.id,
                                    });

                                    rooms()[index].capacity =
                                        event.target.value;
                                }}
                                required
                            />
                        </div>

                        <div class="col col-auto">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary"
                                onclick={() => {
                                    handleDelete(room.id, "rooms", token);
                                    _.remove(
                                        rooms(),
                                        (obj) => obj.id === room.id,
                                    );
                                }}
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
                            onclick={() => {
                                handleDelete(place.id, "places", token);
                                _.remove(
                                    places(),
                                    (obj) => obj.id === place.id,
                                );
                            }}
                        >
                            Delete place
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
