import { fail, redirect} from "@sveltejs/kit";
import { writeFile, rm} from 'fs/promises'
import {db} from "../../lib/utils/prisma.js";
import bcrypt from "bcrypt";

export const load = async({locals}) => {
    if (!locals.user){
        throw redirect(302, '/')
    }

    const user = locals.user

    return {user}
}

export const actions= {
    updateAvatar: async ({locals, request}) => {
        const data = await  request.formData()

        const file = data.get('avatar')?.valueOf()

        const fileName = `avatar-${crypto.randomUUID()}.${file.type.split('/')[1]}`

        if(!file.name || file.name === "undefined"){
            return fail(400, {invalid: true})
        }

        const path = `./src/public/avatars/${fileName}`

        await writeFile(path, new Uint8Array(await  file.arrayBuffer()))

        const profile = await db.profile.findUnique({
            where: {
                userId: locals.user.id,
            },
            include: {
                photo: true
            }
        })

        if (profile && profile.photo){
            console.log(profile.photo)
            await rm(profile.photo[0].path)

            await db.profilePhoto.update({
                where:{
                    id: profile.photo[0].id
                },
                data: {
                    path,
                    name: fileName
                }
            })
        } else {
            const newProfile = await db.profile.create({
                data: {
                    userId: locals.user.id,
                },
            });

            const newPhoto = await db.profilePhoto.create({
                data: {
                    path,
                    profileId: newProfile.id,
                    name: fileName
                },
            });

            await db.profile.update({
                where: { id: newProfile.id },
                data: { photo: { connect: { id: newPhoto.id } } },
            });
        }
    },

    updateName: async({locals, request, cookies}) => {
        const data = await request.formData()
        const username = data.get('name')

        if (!username){
            return fail(400, {invalid: true})
        }

        await db.user.update({
            where: {
                userAuthToken: cookies.get('session')
            },
            data: {
                username
            }
        })
    },

    updateEmail: async ({locals, request, cookies}) => {
        const data = await request.formData()
        const email = data.get('email')

        if(!email){
            return fail(400, {invalid: true})
        }

        await db.user.update({
            where:{
                userAuthToken: cookies.get('session')
            },
            data:{
                email
            }
        })
    },

    updatePassword: async ({locals, request, cookies}) => {
        const data = await request.formData()
        const oldPass = data.get('oldPass')
        const newPass = data.get('newPass')
        const confirm = data.get('confirmNewPass')

        const user = await db.user.findUnique({
            where:{
                userAuthToken: cookies.get('session')
            }
        })

        console.log(user)

        if (!oldPass || !newPass || !confirm){
            return fail(400, {incomplete: true})
        }

        let confirmed = await bcrypt.compare(oldPass,  user.passwordHash)
        let checked = await bcrypt.compare(newPass, user.passwordHash)

        if (checked){
            return fail(400, {similaire: true})
        }

        if (!confirmed){
            return fail(400, {invalid: true})
        }

        if (newPass !== confirm){
            return fail(400, {incorrect: true})
        }

        const newPassHash = await bcrypt.hash(newPass, 10)

        await db.user.update({
            where:{
                userAuthToken: cookies.get('session')
            },
            data:{
                passwordHash: newPassHash
            }
        })
    }



}