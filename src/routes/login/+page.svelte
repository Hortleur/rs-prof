<script>

    export let form
</script>

<div class="min-h-[80dvh] grid place-items-center">
    <div>
        <form method="POST" class="flex flex-col gap-3">
            <label for="email" class="flex flex-col">
                <span class="font-semibold">Email</span>
                <input type="email" name="email" id="email" class="input input-bordered" required>
            </label>
            <label for="password" class="flex flex-col">
                <span class="font-semibold">Mot de passe</span>
                <input type="password" name="password" id="password" class="input input-bordered" required>
            </label>
            {#if form?.invalid}<p class="text-error">L'email et le mot de passe sont requis !</p>{/if}
            {#if form?.credentials}<p class="text-error">Identifiants incorrectes !</p>{/if}
            <button class="btn btn-accent">Se Connecter</button>
        </form>
        <a href="/register">Pas de compte ?</a>

    </div>
</div>