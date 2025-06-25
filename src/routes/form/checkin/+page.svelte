<script>
  import FloatingInputField from "../../FloatingInputField.svelte";

  import { fade } from "svelte/transition";
  import { countries } from "$lib/countries.js";
  import { enhance } from "$app/forms";

  import SelectInput from "../../SelectInput.svelte";

  let { data, form } = $props();
  let showForm = $state(true);

  /*eslint-disable no-unused-vars */
  let selectedRetreatId = $state(0);

  function formatRetreatName(retreat) {
    if (retreat) {
      return (
        retreat.type +
        " (" +
        new Date(retreat.start_date).toLocaleDateString("en-DB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
        " to " +
        new Date(retreat.end_date).toLocaleDateString("en-DB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
        ")"
      );
    }
    return "";
  }
</script>

{#if form?.exists}
  <p>Email already exists</p>
{/if}

<div class="row row-cols-1 g-3 mt-2">
  <div class="col">
    <h3>Check-in</h3>
  </div>
  <div class="col">
    {#if showForm}
      <form
        method="POST"
        transition:fade
        use:enhance={() => {
          if (!form?.exists) {
            showForm = false;
          }
        }}
      >
        <div class="row">
          <div class="col">
            <FloatingInputField
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              label="First name"
            />
          </div>

          <div class="col">
            <FloatingInputField
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              label="Last name"
            />
          </div>
        </div>

        <FloatingInputField
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          label="Email"
        />

        <FloatingInputField
          id="phone"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          label="Phone"
        />

        <SelectInput
          id="gender"
          name="gender"
          options={["Male", "Female", "Other"]}
          label="Gender"
        />

        <SelectInput
          id="nationality"
          name="nationality"
          options={countries}
          property="name"
          label="Nationality"
        />

        <div class="form-floating mb-3">
          <select
            class="form-select"
            id="retreat"
            name="retreat"
            aria-label="Select retreat"
            onchange={(event) => (selectedRetreatId = event.target.value)}
          >
            {#each data.retreats as retreat (retreat.id)}
              <option value={retreat.id}>
                {retreat.type === "flexible"
                  ? retreat.type
                  : formatRetreatName(retreat)}
              </option>
            {/each}
          </select>
          <label class="form-label" for="retreat">Retreat</label>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">When do you plan to leave?</span>
          <input
            class="form-control"
            type="date"
            id="leaveDate"
            name="leaveDate"
            placeholder="Enter date of leaving"
            required
          />
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>
      </form>
    {:else}
      <div class="row align-items-center justify-items-center">
        <div class="col">
          <div class="alert alert-success" role="alert">
            Thank you for filling out the form. Please continue with the steps
            below.
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
