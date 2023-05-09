import express, { Router, Request, Response } from "express"

// Model user
import { findUsers } from "../model/User"

const router: Router = express.Router()

router.get("/all", async (req: Request, res: Response) => {
	const users = await findUsers()
	res.status(200).json({ users: users })
})

module.exports = router
