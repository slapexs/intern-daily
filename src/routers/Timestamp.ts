import express, { Router, Request, Response } from "express"
import { insertTimestamp } from "../model/Timestamp"
const router: Router = express.Router()

router.post("/add", async (req: Request, res: Response) => {
	const { date, enterTime, leaveTime, uid } = req.body
	const time = await insertTimestamp({ date, enterTime, leaveTime, uid })
	res.status(time.statusCode).json({ status: time.status })
})

module.exports = router
