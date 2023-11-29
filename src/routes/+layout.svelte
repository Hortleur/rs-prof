<script>
    import "../app.css"
    import Header from '$lib/components/header.svelte'
    import FloatingButton from "../lib/components/FloatingButton.svelte";
    import {page} from "$app/stores";
    import {enhance} from "$app/forms";

    export let data

</script>

<main class="relative min-h-screen">
    <Header />
    <slot />
    {#if $page.route.id === '/'}
        <button onclick="addPost.showModal()">
            <FloatingButton icon="mingcute:add-fill" />
        </button>
    {/if}
</main>