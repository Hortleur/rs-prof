import {db} from "../lib/utils/prisma.js";

export const load = async ({locals}) => {
    const niveaux = await db.niveau.findMany()

    return {
        user: locals.user,
        niveaux: niveaux
    }
}