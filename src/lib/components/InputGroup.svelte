<script>
  let { id, type, name, placeholder, text, value = $bindable() } = $props();
</script>

<div class="input-group mb-3">
  <span class="input-group-text">{text}</span>
  <input
    class="form-control"
    {id}
    {name}
    {type}
    {placeholder}
    {value}
    required
  />
</div>
