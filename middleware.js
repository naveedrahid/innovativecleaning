import { throttleMiddleware } from "@/src/middleware/throttle"

export function middleware(req){
    return throttleMiddleware(req)
}