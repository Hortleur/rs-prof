<script>
    import ProfilImg from "$lib/components/params/profilImg.svelte";
    import defaultAvatar from '$lib/assets/images/defaultAvatar.png'
    import UserParams from "$lib/components/params/userParams.svelte"
    export let data

    export let form
</script>

<div class="flex flex-col gap-10">
    <section class="flex flex-col gap-5 md:flex-row flex-nowrap md:items-center md:justify-evenly">
        <ProfilImg user={data.user} defaultAvatar={defaultAvatar} />
        <UserParams user="{data.user}" form="{form}"/>
    </section>
</div>