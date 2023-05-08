import express, { Express, Request, Response } from "express"
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { createConnection } from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()
const jwtSecret = "intern-daily"

// Connect database
const condb = createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: 3306,
})

condb.connect((e) => {
	try {
		console.log("Database is connected!")
	} catch (e) {
		console.log(`Error: ${e}`)
	}
})

// Router
router.get("/login", (req: Request, res: Response) => {
	const { username, password } = req.body
	res.status(200).json({ status: { username, password } })
})

module.exports = router
