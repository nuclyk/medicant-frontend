<div class="col col-4 flex-fill opacity-75">
    <input
        class="form-control form-control-sm text-center"
        type="number"
        name="room"
        id="room"
        placeholder="1"
        onchange={(e) => handleChange(place.id, e)}
        required
    />
</div>

<div class="col col-4 flex-fill opacity-75">
    <input
        class="form-control form-control-sm text-center"
        type="number"
        name="room"
        id="room"
        placeholder="1"
        onchange={(e) => handleChange(place.id, e)}
        required
    />
</div>

<div class="col col-auto">
    <button
        type="button"
        class="btn btn-sm btn-outline-primary flex-fill w-100"
        onclick={() => handleDelete(place.id)}
        >+
    </button>
</div>
