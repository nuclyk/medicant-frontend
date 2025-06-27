<script>
  import FloatingInputField from "$lib/components/FloatingInputField.svelte";

  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";

  let showForm = $state(true);
</script>

<div class="row row-cols-1 g-3 mt-2">
  <div class="col">
    <h3>Check-out</h3>
  </div>

  {#if showForm}
    <div class="col">
      <form
        method="POST"
        action="?/checkout"
        transition:fade
        use:enhance={() => {
          showForm = false;
        }}
      >
        <FloatingInputField
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          label="Email"
        />
        <button type="submit" class="btn btn-primary btn-lg mt-2"
          >Check-out</button
        >
      </form>
    </div>
  {:else}
    <div class="col">
      <div class="alert alert-success" role="alert">
        You have been checked-out. See you next time! :)
      </div>
    </div>
  {/if}
</div>
