<script>
    import {enhance} from "$app/forms";
    import Icon from '@iconify/svelte';
    export let user

    export let form

    let passUpdate = false
    let nameUpdate = false
    let emailUpdate = false
</script>

<div class="flex flex-col gap-5">
    <div>
        {#if nameUpdate}
            <form action="?/updateName" method="POST" class="flex flex-col flex-nowrap gap-5 pl-3" use:enhance>
                <label for="name">
                    <span>Nom d'utilisateur</span>
                    <input type="text" name="name" id="name" class="input input-bordered" placeholder="{user.name}" required>
                </label>
                <div>
                    <button class="btn btn-success" type="submit">Modifier</button>
                    <button class="btn btn-error" on:click|preventDefault={() => (nameUpdate = !nameUpdate)}>Annuler</button>
                </div>
            </form>
        {:else }
            <div class="flex flex-row flex-nowrap justify-evenly">
                <p>Nom d'utilisateur: {user.name}</p>
                <button  on:click|preventDefault={() => (nameUpdate = !nameUpdate)}>

                    <Icon icon="basil:edit-outline" width="24" class="text-primary"/>
                </button>
            </div>
        {/if}
    </div>

    <div>
        {#if emailUpdate}
            <form action="?/updateEmail" method="POST" class="flex flex-col flex-nowrap gap-5 pl-3" use:enhance>
                <label for="email">
                    <span>Email</span>
                    <input type="email" name="email" id="email" class="input input-bordered" placeholder="{user.email}" required>
                    <div>
                        <button class="btn btn-success" type="submit">Modifier</button>
                        <button class="btn btn-error" on:click|preventDefault={() => (emailUpdate = !emailUpdate)}>Annuler</button>
                    </div>
                </label>
            </form>
        {:else }
            <div class="flex flex-row flex-nowrap justify-evenly">
                <p>Email: {user.email}</p>
                <button on:click|preventDefault={() => (emailUpdate = !emailUpdate)}>

                    <Icon icon="basil:edit-outline" width="24" class="text-primary" />
                </button>
            </div>
        {/if}
    </div>

    <div>
        {#if passUpdate}
            <form action="?/updatePassword"  method="POST" class="flex flex-col flex-nowrap gap-5 pl-3" use:enhance>
                <div>
                    <label for="oldPass">
                        <span>Ancien mot de passe</span>
                        <input type="password" name="oldPass" id="oldPass" class="input input-bordered" placeholder="Ancien mot de passe" required>
                        {#if form?.invalid}
                            <p class="text-error">Mauvais mot de passe</p>
                        {/if}
                    </label>
                </div>
                <div>
                    <label for="newPass">
                        <span>Nouveau mot de passe</span>
                        <input type="password" name="newPass" id="newPass" class="input input-bordered" placeholder="Nouveau mot de passe" required>
                        {#if form?.incorrect}
                            <p class="text-error">Les mots de passe ne correspondent pas</p>
                        {/if}
                    </label>
                </div>
                <div>
                    <label for="confirmNewPass">
                        <span>Confirmez le nouveau mot de passe</span>
                        <input type="password" name="confirmNewPass" id="confirmNewPass" class="input input-bordered" placeholder="Confirmation" required>
                        {#if form?.incorrect}
                            <p class="text-error">Les mots de passe ne correspondent pas</p>
                        {/if}
                    </label>
                </div>
                {#if form?.incomplete}
                    <p class="text-error">Veuillez remplir le formulaire.</p>
                {/if}
                {#if form?.similaire}
                    <p class="text-error">Nouveau mot de passe Incorrect</p>
                {/if}
                <div>
                    <button class="btn btn-success" type="submit">Modifier</button>
                    <button class="btn btn-error" on:click|preventDefault={() => (passUpdate = !passUpdate)}>Annuler</button>
                </div>
            </form>
        {:else }
            <div class="flex flex-row flex-nowrap justify-evenly">
                <div>
                    <span> Password: </span><input type="password" class="disabled" value=" {user.password}" />
                </div>
                <button on:click|preventDefault={() => (passUpdate = !passUpdate)}>
                    <Icon icon="basil:edit-outline" width="24" class="text-primary" />
                </button>
            </div>
        {/if}


    </div>
</div>