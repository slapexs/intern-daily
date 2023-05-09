import express, { Router, Request, Response } from "express"

// Model user
import { findUsers, createUser } from "../model/User"

const router: Router = express.Router()

router.get("/all", async (req: Request, res: Response) => {
	const users = await findUsers()
	res.status(200).json({ users: users })
})

router.post("/create", async (req: Request, res: Response) => {
	const resStatus = await createUser(req.body)
	res.status(resStatus.statusCode).json({ status: resStatus.status })
})

module.exports = router
