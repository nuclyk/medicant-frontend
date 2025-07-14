<script>
    let {
        id,
        type,
        name,
        placeholder = "",
        label = "Type in here...",
        value = $bindable(),
        ro = false,
        required = true,
        disabled = false,
    } = $props();

    let element = $state();

    $effect(() => {
        element.required = required;
        element.disabled = disabled;
    });
</script>

<div class="form-floating mb-3">
    <input
        bind:this={element}
        class="form-control"
        {id}
        {type}
        {name}
        {placeholder}
        bind:value
        readonly={ro}
    />
    <label for={id}>{label}</label>
</div>
