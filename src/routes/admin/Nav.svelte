<script>
    const { user } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
        <a class="navbar-brand" href="/admin">Medicant</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/admin"
                        >Dashboard</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/form/checkin" target="_blank"
                        >Check-in</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/form/checkout" target="_blank"
                        >Check-out</a
                    >
                </li>
                <!-- <li class="nav-item"> -->
                <!--   <a class="nav-link" href="/qrcodes">QR Codes</a> -->
                <!-- </li> -->
                <li class="nav-item">
                    <a class="nav-link" href="/admin/manage/users">Manage</a>
                </li>
                <li class="nav-item">
                    {#if !user}
                        <a class="nav-link btn-success" href="/admin/login"
                            >Login</a
                        >
                    {:else}
                        <form action="/login?/logout" method="POST">
                            <button type="submit" class="btn btn-danger"
                                >Logout</button
                            >
                        </form>
                    {/if}
                </li>
            </ul>
        </div>
    </div>
</nav>
