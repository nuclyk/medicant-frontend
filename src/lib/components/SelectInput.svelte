<script>
  let { id, name, options, property, label, value } = $props();
</script>

<div class="form-floating mb-3">
  <select class="form-select" {id} {name} aria-label={"Select " + name} {value}>
    <option selected></option>
    {#each options as option, index (index)}
      {#if property}
        <option value={option[property]}>{option[property]}</option>
      {:else}
        <option value={option}>{option}</option>
      {/if}
    {/each}
  </select>
  <label class="form-label" for={id}>{label}</label>
</div>
