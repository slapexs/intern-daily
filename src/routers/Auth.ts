import express, { Express, Request, Response, Router } from "express"
import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { findUserById, checkUser, responseStatusProps } from "../model/User"
import { config } from "../../config/index"

const router: Router = express.Router()
const JWTSecret: string = config.JWTSecret as string

// Authentication
router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body
	const findUser = await checkUser(username)
	if (findUser.length < 1) {
		res.status(401).json({ status: "Invalid username" })
	} else {
		// check match username password
		const passwordMatched = bcrypt.compareSync(password, findUser[0].password)
		if (passwordMatched) {
			const authSecret = JWTSecret
			const token = await jwt.sign(
				{ id: findUser[0].userId, name: findUser[0].name },
				authSecret
			)
			res.status(200).json({ status: "Successfully logged in", token })
		} else {
			res.status(401).json({ status: "Password is incorrect" })
		}
	}
})

router.post("/user", async (req: Request, res: Response) => {
	const authSecret = JWTSecret
	const userToken = req.headers.authorization
	const token: any = userToken?.split(" ")
	const decoded = jwt.verify(token[1], authSecret)

	res.status(200).json({ response: decoded })
})

module.exports = router
