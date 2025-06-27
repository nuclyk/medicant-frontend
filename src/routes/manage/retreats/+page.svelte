<script>
    import AddIcon from "../AddIcon.svelte";
    import DeleteIcon from "../DeleteIcon.svelte";

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

<form method="POST">
    <div class="row mt-3 g-3">
        <div class="col-sm input-group">
            <span class="input-group-text">Start date</span>
            <input
                class="form-control"
                type="date"
                id="startDate"
                name="startDate"
                required
            />
        </div>
        <div class="col-sm input-group">
            <span class="input-group-text">End date</span>
            <input
                class="form-control"
                type="date"
                id="endDate"
                name="endDate"
                required
            />
        </div>
        <div class="col-sm">
            <button type="submit" class="btn btn-success"
                >Add retreat <AddIcon /></button
            >
        </div>
    </div>
</form>
<div class="row mt-3">
    <div class="table-responsive text-nowrap">
        <table
            class="table table-striped table-hover table-borderless
                align-middle text-capitalize"
        >
            <thead>
                <tr class="">
                    <th scope="col" class="col-2">Retreat code</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {#each retreats as retreat (retreat.id)}
                    <tr>
                        <td>
                            <input
                                class="form-control-plaintext"
                                type="text"
                                name="retreatCode"
                                value={retreat.retreat_code}
                                readonly
                            />
                        </td>
                        <td>
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
                        </td>
                        <td>
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
                        </td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-warning"
                                onclick={() => handleDelete(retreat.id)}
                                ><DeleteIcon /></button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
