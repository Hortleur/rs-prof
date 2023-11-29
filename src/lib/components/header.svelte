<script>
    import Icon from '@iconify/svelte';
    import {page} from "$app/stores";
    import defaultAvatar from '$lib/assets/images/defaultAvatar.png'


    let loggedIn = false

    if ($page.data.user){
        loggedIn = true
    }
</script>
<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">LCP</a>
    </div>
    {#if loggedIn}
        <div class="flex-none">
            <a href="/bookmark"><Icon icon="ph:bookmark" width="38" /></a>
            <a href="/parametres">
                <div class="w-10 rounded-full">
                    {#if $page.data.user.profile.photo[0]}
                        <img alt="photo de profil" class="mask mask-circle" src="{$page.data.user.profile.photo[0].path}" />
                    {:else }
                        <img alt="photo de profil" class="mask mask-circle" src="{defaultAvatar}" />
                    {/if}
                </div>
            </a>
        </div>
        {:else }
        <a href="/login" class="btn btn-accent">Se Connecter</a>
    {/if}
</div>