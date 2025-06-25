<script>
  import dayjs from "dayjs";

  import FloatingInputField from "$lib/components/FloatingInputField.svelte";
  import SelectInput from "$lib/components/SelectInput.svelte";
  import InputGroup from "$lib/components/InputGroup.svelte";

  import { fade } from "svelte/transition";
  import { countries } from "$lib/countries.js";

  let { data, form } = $props();
  let showForm = $state(true);

  /*eslint-disable no-unused-vars */
  let selectedRetreatId = $state();

  let formData = $state({
    first_name: form?.formData?.first_name || "",
    last_name: form?.formData?.last_name || "",
    email: form?.formData?.email || "",
    phone: form?.formData?.phone || "",
    gender: form?.formData?.gender || "",
    nationality: form?.formData?.nationality || "",
    diet: form?.formData?.diet || "",
    retreat_id: form?.formData?.retreat_id || (() => selectedRetreatId),
    leave_date: form?.formData?.leave_date || "",
  });

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

<div class="row row-cols-1 g-3 mt-2">
  <div class="col">
    <h3>Check-in</h3>
  </div>
  {#if form?.error}
    <div class="row align-items-center justify-items-center mt-2">
      <div class="col">
        <div class="alert alert-danger" role="alert">
          {form?.error}. Please try again.
        </div>
      </div>
    </div>
  {/if}
  <div class="col">
    {#if showForm}
      <form method="POST" transition:fade>
        <div class="row">
          <div class="col">
            <FloatingInputField
              id="first_name"
              type="text"
              name="first_name"
              placeholder="Enter your first name"
              label="First name"
              bind:value={formData.first_name}
            />
          </div>

          <div class="col">
            <FloatingInputField
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              label="Last name"
              bind:value={formData.last_name}
            />
          </div>
        </div>

        <FloatingInputField
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          label="Email"
          bind:value={formData.email}
        />

        <FloatingInputField
          id="phone"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          label="Phone"
          bind:value={formData.phone}
        />

        <SelectInput
          id="gender"
          name="gender"
          options={["Male", "Female", "Other"]}
          label="Gender"
          bind:value={formData.gender}
        />

        <SelectInput
          id="nationality"
          name="nationality"
          options={countries}
          property="name"
          label="Nationality"
          bind:value={formData.nationality}
        />

        <SelectInput
          id="diet"
          name="diet"
          options={["None", "Vegetarian", "Vegan"]}
          label="Diet"
          bind:value={formData.diet}
        />

        <div class="form-floating mb-3">
          <select
            class="form-select"
            id="retreat"
            name="retreat"
            aria-label="Select retreat"
            onchange={(event) => (selectedRetreatId = event.target.value)}
            required
          >
            <option value="">Select a retreat</option>
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

        <InputGroup
          id="leave_date"
          name="leave_date"
          type="date"
          placeholder="Enter date of leaving"
          text="When do you plan to leave?"
        />

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
