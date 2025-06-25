<script>
  import AddIcon from "../AddIcon.svelte";
  import DeleteIcon from "../DeleteIcon.svelte";

  import { API } from "$lib/api";
  import { error } from "@sveltejs/kit";

  let { data } = $props();
  let places = $state(data.places.filter((place) => place.name != "None"));

  async function handleDelete(name) {
    const response = await fetch(API + "places/" + name, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      error("Failed to delete place:", response.statusText);
      return;
    }

    let index = places.findIndex((place) => place.name === name);
    places.splice(index, 1);
  }

  async function handleChange(name, event) {
    const response = await fetch(API + "places/" + name, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [event.target.name]: event.target.value,
      }),
    });

    if (!response.ok) {
      error("Failed to update place:", response.statusText);
      return;
    }

    let index = places.findIndex((place) => place.name === name);
    places[index] = await response.json();
  }
</script>

<form method="POST">
  <div class="row mt-3 text-nowrap">
    <div class="col-2">
      <input
        class="form-control"
        type="text"
        name="name"
        placeholder="Name of the place"
        required
      />
    </div>
    <div class="col-2">
      <input
        class="form-control"
        type="number"
        name="capacity"
        placeholder="Capacity"
        required
      />
    </div>
    <div class="col-2">
      <button type="submit" class="btn btn-success"
        >Add place <AddIcon /></button
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
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Capacity</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {#each places as place (place.name)}
          <tr>
            <td>
              <input
                class="form-control"
                type="text"
                name="name"
                value={place.name}
                onchange={(e) => handleChange(place.name, e)}
                required
              />
            </td>
            <td>
              <input
                class="form-control"
                type="number"
                name="capacity"
                value={place.capacity}
                onchange={(e) => handleChange(place.name, e)}
                required
              />
            </td>
            <td>
              <button
                type="button"
                class="btn btn-warning"
                onclick={() => handleDelete(place.name)}><DeleteIcon /></button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
