<script>
    import { page } from "$app/state";
    let activeTab = $derived(page.url.pathname);
</script>

<ul class="nav nav-tabs card-header-tabs">
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/manage/users' ? 'active' : ''}"
            aria-current="page"
            href="/manage/users">Users</a
        >
    </li>
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/manage/places' ? 'active' : ''}"
            aria-current="page"
            href="/manage/places">Places</a
        >
    </li>
    <li class="nav-item">
        <a
            class="nav-link {activeTab === '/manage/retreats' ? 'active' : ''}"
            href="/manage/retreats">Retreats</a
        >
    </li>
</ul>
