<script>
    import logo from "$lib/assets/images/logo.png";
    const { user } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary" style="z-index: 1000;">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Medicant</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
        >
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>

            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
                    {#if user?.role === "admin" || user?.role === "volunteer"}
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link" href="/admin">Dashboard</a>
                        </li>
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link" href="/admin/manage/users"
                                >Manage</a
                            >
                        </li>
                        {#if user}
                            <li class="nav-item" data-bs-dismiss="offcanvas">
                                <a class="nav-link" href="/stats">Stats</a>
                            </li>
                        {/if}
                    {/if}

                    <li class="nav-item dropdown">
                        <span
                            class="nav-link dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Participants
                        </span>
                        <ul class="dropdown-menu">
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="/form/checkin"
                                    target="_blank">Checkin form</a
                                >
                            </li>
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="/form/checkout"
                                    target="_blank">Checkout form</a
                                >
                            </li>
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="https://docs.google.com/forms/d/13bFgq_tOMwPFlX2VXiOH461XZrEBO84In_53hvDI_ug"
                                    target="_blank">Feedback form</a
                                >
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="https://drive.google.com/file/d/1bkHNBi1SC7h8odB1kxZ4-qnAI83dS0yr/view?usp=drive_link"
                                    target="_blank">Guidelines</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <span
                            class="nav-link dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Volunteers
                        </span>
                        <ul class="dropdown-menu">
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="https://docs.google.com/document/d/13pHelZQkIEyO_3_5vBzJu5vIoPE3h59oeIuxuP4eQy4/edit?tab=t.0"
                                    target="_blank">Retreat Schedules</a
                                >
                            </li>
                            <li data-bs-dismiss="offcanvas">
                                <a
                                    class="dropdown-item"
                                    href="https://docs.google.com/document/d/1XNbgcbi5iV4hK12yv3WDzxuYoNziLMLDaLavF_hWrSc/edit?tab=t.0"
                                    target="_blank">Daily VLT</a
                                >
                            </li>
                            <!-- <li> -->
                            <!--     <hr class="dropdown-divider" /> -->
                            <!-- </li> -->
                            <!-- <li> -->
                            <!--     <a class="dropdown-item" href="#" -->
                            <!--         >Something else here</a -->
                            <!--     > -->
                            <!-- </li> -->
                        </ul>
                    </li>
                    <li class="nav-item">
                        <div class="d-inline" data-bs-dismiss="offcanvas">
                            {#if !user}
                                <a
                                    class="btn text-bg-primary rounded"
                                    href="/login">Login</a
                                >
                            {:else}
                                <form action="/login?/logout" method="POST">
                                    <button
                                        type="submit"
                                        data-bs-dismiss="offcanvas"
                                        class="btn text-bg-primary rounded d-inline"
                                        >Logout</button
                                    >
                                </form>
                            {/if}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
