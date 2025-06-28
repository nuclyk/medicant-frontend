<script>
    import { API } from "$lib/api";
    import { error } from "@sveltejs/kit";

    let { data } = $props();

    let retreats = $state(
        data.retreats.filter((retreat) => retreat.type != "flexible"),
    );

    async function handleDelete(id) {
        const response = await fetch(API + "retreats/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
        });

        if (!response.ok) {
            error("Failed to delete retreat:", response.statusText);
            return;
        }

        let index = retreats.findIndex((retreat) => retreat.id === id);
        retreats.splice(index, 1);
    }

    async function handleChange(id, event) {
        const response = await fetch(API + "retreats/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.token,
            },
            body: JSON.stringify({
                [event.target.name]: event.target.value,
            }),
        });

        if (!response.ok) {
            error("Failed to update retreat:", response.statusText);
            return;
        }
    }
</script>

<div class="container">
    <form method="POST">
        <p>Add new retreat</p>
        <div class="row bg-light border rounded-1 p-2 g-2">
            <div class="col-xxl input-group">
                <span class="input-group-text">Start date</span>
                <input
                    class="form-control"
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                />
            </div>
            <div class="col-xxl input-group">
                <span class="input-group-text">End date</span>
                <input
                    class="form-control"
                    type="date"
                    id="endDate"
                    name="endDate"
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

    <p>Edit retreats</p>
    {#each retreats as retreat (retreat.id)}
        <div
            class="row g-2 bg-light border rounded-1 p-2 my-2 align-items-center"
        >
            <div class="col-lg-auto text-center">
                <p class="lead m-0 mx-3">
                    {retreat.retreat_code}
                </p>
            </div>
            <div class="col-lg-auto flex-fill">
                <input
                    class="form-control"
                    type="date"
                    name="start_date"
                    value={retreat.start_date}
                    onchange={(event) => {
                        handleChange(retreat.id, event);
                    }}
                    required
                />
            </div>
            <div class="col-lg-auto flex-fill">
                <input
                    class="form-control"
                    type="date"
                    name="end_date"
                    value={retreat.end_date}
                    retreat.end_date="event.target.value"
                    onchange={(event) => {
                        handleChange(retreat.id, event);
                    }}
                    required
                />
            </div>
            <div class="col-lg-auto">
                <button
                    type="button"
                    class="btn btn-dark flex-fill w-100"
                    onclick={() => handleDelete(retreat.id)}>Delete</button
                >
            </div>
        </div>
    {/each}
</div>
