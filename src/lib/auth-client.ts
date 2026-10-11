import { createAuthClient } from "better-auth/react"

// The browser and Better Auth API share this Next.js origin. Never expose the
// MongoDB connection string as the auth server URL.
export const authClient = createAuthClient()
