import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import {ROUTES} from '@/constants/routes'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

const matchPath = (pathname, paths) => paths.some((p) => pathname?.startsWith(p))

export async function authMiddleware(req) {
    const {pathname} = req.nextUrl
    const token = req.cookies.get('token')?.value

    if (matchPath(pathname, ROUTES.PUBLIC_ONLY) && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (matchPath(pathname, ROUTES.PROTECTED)) {
        if(!token) return NextResponse.redirect(new URL('/login', req.url))

        try {
            const {payload} = await jwtVerify(token, secret)

            const requiredRole = ROUTES.ROLE_BASED[pathname]
            if (requiredRole && payload.role !== requiredRole) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        } catch (err) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
    return NextResponse.next()
}