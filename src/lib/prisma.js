import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

let prisma

function createPrismaClient(){
    const client = new PrismaClient()
    client.$connect()
    .then(() => console.log('[DB] ✅ Prisma connected successfully.'))
    .catch((err) => console.error('[DB] ❌ Prisma connection failed:', err))

    return client
}

if (process.env.NODE_ENV !== 'production') {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = createPrismaClient()
    }
    prisma = globalForPrisma.prisma
} else{
    prisma = createPrismaClient()
}

export default prisma