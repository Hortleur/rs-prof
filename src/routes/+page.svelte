<script>
    import {enhance} from "$app/forms";

    export let data
</script>
<section class="relative">
    <h1 class="text-center text-5xl font-bold">Le Coin des Profs</h1>
    <dialog id="addPost" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="font-bold text-lg text-center">Commencer un post</h3>
            <div class="my-5">
                <form action="?/newPost" method="POST" class="grid place-items-center gap-3 " enctype="multipart/form-data" use:enhance>
                    <label for="title">
                        <input type="text" name="title" id="title" class="input input-bordered input-accent  placeholder-black" placeholder="Titre" required>
                    </label>
                    <label for="content">
                        <textarea name="content" id="content" cols="25" rows="5" placeholder="Contenu" class="textarea textarea-bordered textarea-sm textarea-accent  placeholder-black" required></textarea>
                    </label>
                    <label for="photo">
                        <input type="file" name="photo" id="photo" class="file-input file-input-accent  placeholder-black" multiple>
                    </label>
                    <label for="theme" class="label">
                        <input type="text" name="theme" id="theme" class="input input-bordered input-accent  placeholder-black" placeholder="Thème" required>
                    </label>
                    <label>
                        <select class="select select-bordered select-accent" name="niveau" required>
                            <option class="disabled">Choisissez un niveau</option>
                            {#each data.niveaux as niveau}
                                <option value="{niveau.id}">{niveau.name}</option>
                            {/each}
                        </select>
                    </label>
                    <label for="published" class="label flex flex-row flex-nowrap gap-3" >
                        <span class="label-text">Publier: </span><input type="checkbox" class="toggle toggle-success" name="published" />
                    </label>
                    <div class=" flex flex-row flex-nowrap justify-evenly w-full modal-action">
                        <button class="btn btn-success" type="submit">Poster</button>
                        <button class="btn btn-error" onclick="addPost.close()">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
</section>