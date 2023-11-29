import {fail, redirect} from "@sveltejs/kit";
import bcrypt from 'bcrypt'

import {db} from '$lib/utils/prisma'

const Roles = {
    ADMIN : 'ADMIN',
    USER: 'USER'
}

export const load = async({locals}) => {
    if (locals.user){
        throw redirect(302, '/')
    }
}

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email')
        const username = data.get('username')
        const password = data.get('password')
        const confirm = data.get('confirm_password')

        if (typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string' || typeof confirm !== 'string' || !email || !username || !password || !confirm){
            return fail(400, {invalid: true})
        }

        if (confirm !== password) {
            return fail(400, {confirm, incorrect: true})
        }

        const user = await db.user.findUnique({
            where: {username}
        })

        if (user){
            return fail(400, {user: true})
        }

        const mail = await db.user.findUnique({
            where: {email}
        })

        if (mail) {
            return fail(400, {mail: true})
        }

        await db.user.create({
            data:{
                username,
                email,
                passwordHash: await bcrypt.hash(password, 10),
                userAuthToken: crypto.randomUUID(),
                role: {connect: {name: Roles.USER}}
            }
        })

        throw redirect(303,'/login')
    }
}