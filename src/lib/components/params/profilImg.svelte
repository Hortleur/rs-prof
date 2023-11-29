<script>
    import {enhance} from "$app/forms";

    let fileInput = false

    export  let user
    export let defaultAvatar
</script>

<div class="md:w-1/4">
    {#if user.profile}
        <img src="{user.profile.photo[0].path}" alt="{user.name}" on:click|preventDefault={()=>(fileInput = !fileInput)} class="mask mask-circle">
    {:else }
        <img src="{defaultAvatar}" alt="Avatar par défaut" on:click|preventDefault={()=>(fileInput = !fileInput)} class="mask mask-circle">
    {/if}

    {#if fileInput}
        <form action={'?/updateAvatar'} class="mx-auto" method="post" enctype="multipart/form-data" use:enhance on:submit={() => (fileInput = !fileInput)}>
            <input type="file" name="avatar" id="avatar" accept="images/*" required>
            <button class="btn btn-success" type="submit">modifier</button>
        </form>
        {:else }
        <span class="italic text-center block">Pour modifier cliquez sur l'image</span>
    {/if}
</div>