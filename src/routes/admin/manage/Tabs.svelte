<script>
    import { page } from "$app/state";
    let activeTab = $derived(page.url.pathname);
</script>

<ul class="nav nav-tabs card-header-tabs">
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/admin/manage/users'
                ? 'active'
                : ''}"
            aria-current="page"
            href="/admin/manage/users">Users</a
        >
    </li>
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/admin/manage/places'
                ? 'active'
                : ''}"
            aria-current="page"
            href="/admin/manage/places">Places</a
        >
    </li>
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/admin/manage/retreats'
                ? 'active'
                : ''}"
            href="/admin/manage/retreats">Retreats</a
        >
    </li>
</ul>
