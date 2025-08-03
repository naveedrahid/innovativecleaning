import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 10,
    blockDuration:30,
})

export default rateLimiter