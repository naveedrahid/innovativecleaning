import prisma from '@lib/primsa'

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: {email}})
}

export const createUser = async ({name, email, password}) => {
    return await prisma.user.create({
        data: {name, email, password},
    })
}