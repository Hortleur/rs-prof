<script>

    export let form
</script>

<div class="min-h-[80dvh] grid place-items-center">
    <div class="flex flex-col flex-nowrap gap-4">
        <form method="POST" class="flex flex-col gap-3">
            <label for="email" class="flex flex-col">
                <span class="font-semibold">Email</span>
                <input type="email" name="email" id="email" class="input input-bordered" required>
            </label>
            <label for="username" class="flex flex-col">
                <span class="font-semibold">Nom d'utilisateur</span>
                <input type="text" name="username" id="username" class="input input-bordered" required>
            </label>
            <label for="password" class="flex flex-col">
                <span class="font-semibold">Mot de passe</span>
                <input type="password" name="password" id="password" class="input input-bordered" required>
            </label>
            <label for="confirm_password" class="flex flex-col">
                <span class="font-semibold">Confirmer votre mot de passe</span>
                <input type="password" name="confirm_password" id="confirm" class="input input-bordered" required>
            </label>
            {#if form?.incorrect}<p class="text-error">Les mots de passe ne correspondent pas !</p>{/if}
            {#if form?.invalid}<p class="text-error">Des identifiants sont invalides !</p>{/if}
            {#if form?.user}<p class="text-error">Ce nom d'utilisateu existe déjà !</p>{/if}
            {#if form?.mail}<p class="text-error">E-mail incorrect !</p>{/if}
            <button class="btn btn-accent">Se Connecter</button>
        </form>
        <a href="/login" class="font-semibold underline">Déjà un compte ?</a>
    </div>
</div>