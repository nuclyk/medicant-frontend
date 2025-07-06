<script>
    let { id, text, confirm } = $props();
</script>

<!-- Modal -->
<div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="DeleteModal"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="DeleteModal">Are you sure?</h1>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                Delete <span class="fw-bold text-primary"> {text}</span>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Close</button
                >
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onclick={() => confirm(id)}>Confirm</button
                >
            </div>
        </div>
    </div>
</div>
