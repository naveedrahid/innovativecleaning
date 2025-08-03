import rateLimiter from '@/lib/rateLimiter'
import { NextResponse } from 'next/server'

const shouldRateLimit = (pathname) => 
    pathname?.startsWith('/api/auth') || pathname?.startsWith('/api/form')


export async function throttleMiddleware(req){
    
    try {
        const pathname = req.nextUrl?.pathname
        const ip = req.headers.get('x-forwarded-for') || 'unknown'

        if (!shouldRateLimit(pathname)) return NextResponse.next()
        await rateLimiter.consume(ip)
        return NextResponse.next()
    } catch (err) {
        return new NextResponse(
            JSON.stringify({error: 'Too many requests, please try again later.'}),
            {
                status: 429,
                headers: {'Content-Type': 'application/json'}
            }
        )
    }
}