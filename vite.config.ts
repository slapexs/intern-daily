import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

// https://vitejs.dev/config/
export default defineConfig({
	server: { port: parseInt(process.env.VITE_DEV_PORT) },
	plugins: [react()],
})
