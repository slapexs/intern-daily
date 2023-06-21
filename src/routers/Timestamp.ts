import express, { Router, Request, Response } from "express"
import {
	insertTimestamp,
	recentTimestamp,
	findTimestamp,
} from "../model/Timestamp"
const router: Router = express.Router()

router.post("/add", async (req: Request, res: Response) => {
	const { date, enterTime, leaveTime, uid } = req.body
	const time = await insertTimestamp({ date, enterTime, leaveTime, uid })
	res.status(time.statusCode).json({ status: time.status })
})

router.get("/recent/:uid/:length", async (req: Request, res: Response) => {
	const { uid, length } = req.params
	const { data, status, statusCode } = await recentTimestamp(uid, length)
	res.status(statusCode).json({ status, data })
})

router.get("/findone/:date", async (req: Request, res: Response) => {
	const { date } = req.params
	const { data, status, statusCode } = await findTimestamp(date)
	res.status(statusCode).json({ status, data })
})
module.exports = router
