<script>
  let {
    id,
    type,
    name,
    placeholder = "",
    label = "Type in here...",
    value,
  } = $props();
</script>

<div class="form-floating mb-3">
  <input
    class="form-control"
    {id}
    {type}
    {name}
    {placeholder}
    {value}
    required
  />
  <label for={id}>{label}</label>
</div>
