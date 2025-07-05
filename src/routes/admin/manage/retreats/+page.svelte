<script>
    import { error } from "@sveltejs/kit";
    import dayjs from "dayjs";
    import toast from "svelte-5-french-toast";
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";

    let allRetreats = getContext("retreats");
    let token = getContext("token");
    let apiUrl = getContext("apiUrl");

    let retreats = $derived(
        allRetreats()
            .filter((retreat) => retreat.type != "flexible")
            .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)),
    );

    async function handleDelete(id) {
        try {
            const res = await fetch(apiUrl() + "retreats/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token(),
                },
            });

            if (!res.ok) {
                error(res.status, "Failed to delete retreat");
            }

            let index = allRetreats().findIndex((retreat) => retreat.id === id);
            allRetreats().splice(index, 1);

            toast.success("Retreat deleted successfuly!");
        } catch (err) {
            toast.error(err.body.message);
        }
    }

    async function handleChange(id, event) {
        try {
            const res = await fetch(apiUrl() + "retreats/" + id, {
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
                error(res.status, "Failed to update the retreat");
            }

            let index = allRetreats().findIndex((r) => r.id === id);
            allRetreats()[index] = await res.json();

            toast.success("Retreat updated successfuly!");
        } catch (err) {
            toast.error(err.status + " : " + err.body.message);
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
                    allRetreats().push(result.data);
                    toast.success("Retreat added successfuly!");
                }
            };
        }}
    >
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
                    value={dayjs(retreat.start_date).format("YYYY-MM-DD")}
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
                    value={dayjs(retreat.end_date).format("YYYY-MM-DD")}
                    onchange={(event) => {
                        retreat.end_date = "event.target.value";
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
