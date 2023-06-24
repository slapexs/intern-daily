import dotenv from "dotenv"
dotenv.config()

export const config = {
	JWTSecret: process.env.AUTH_SECRET,
}
