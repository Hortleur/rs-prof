import {db} from "../lib/utils/prisma.js";

export const load = async() => {
}

export const actions =  {
    newPost: async({request, cookies}) => {
        const data = await request.formData()

        const title = data.get("title")
        const content = data.get('content')
        const theme = data.get('theme')
        const niveau = data.get('niveau')
        const published = data.get('published')
        const photo = data.getAll('photo')

        console.log(title, content, theme, niveau, published, photo)
    }
}