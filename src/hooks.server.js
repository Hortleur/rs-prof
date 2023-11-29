import { db } from '$lib/utils/prisma'

export const handle = async ({event, resolve}) => {
    const session = event.cookies.get('session')

    if(!session) {
        return await resolve(event)
    }

    const user = await db.user.findUnique({
        where: {
            userAuthToken: session
        },
        select: {
            id: true,
            username: true,
            email: true,
            passwordHash: true,
            role: true,
            posts: true,
            bookMarks: true,
            profile: {
                select: {
                    photo: true
                }
            }
        }
    })

    if(user) {
        event.locals.user = {
            id: user.id,
            name: user.username,
            email: user.email,
            password: user.passwordHash,
            role: user.role.name,
            posts: user.posts,
            bookmarks: user.bookmarks,
            profile: user.profile
        }
    }

    return await resolve(event)
}