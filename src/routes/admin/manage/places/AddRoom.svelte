<script>
    import toast from "svelte-5-french-toast";
    import { getContext } from "svelte";
    import { error } from "@sveltejs/kit";

    let { placeID } = $props();
    let roomNumber = $state();
    let roomCapacity = $state();

    let rooms = getContext("rooms");
    let apiUrl = getContext("apiUrl");
    let token = getContext("token");

    async function handleAddRoom() {
        try {
            const res = await fetch(apiUrl() + "rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
                body: JSON.stringify({
                    number: roomNumber,
                    capacity: roomCapacity,
                    place_id: placeID,
                }),
            });

            if (!res.ok) {
                error(res.status, "Could not add a room");
            }

            const room = await res.json();
            rooms().push(room);
            roomNumber = "";
            roomCapacity = "";

            toast.success("Room added successfuly!");
        } catch (err) {
            toast.error(err.message);
        }
    }
</script>

<div class="col col-4 flex-fill opacity-75">
    <input
        class="form-control form-control-sm text-center"
        type="number"
        name="room"
        id="room"
        placeholder="Room"
        bind:value={roomNumber}
        required
    />
</div>

<div class="col col-4 flex-fill opacity-75">
    <input
        class="form-control form-control-sm text-center"
        type="number"
        name="room"
        id="room"
        placeholder="Beds"
        bind:value={roomCapacity}
        required
    />
</div>

<div class="col col-auto">
    <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        onclick={() => handleAddRoom()}
        >+
    </button>
</div>
