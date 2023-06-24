import express, { Router, Request, Response } from "express"
import {
	insertTimestamp,
	recentTimestamp,
	findTimestamp,
} from "../model/Timestamp"
import { getUserToken } from "../service/UserAuth"
const router: Router = express.Router()

router.post("/add", async (req: Request, res: Response) => {
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const { date, enterTime, leaveTime } = req.body
	const time = await insertTimestamp({
		date,
		enterTime,
		leaveTime,
		token: checkToken.token,
	})
	res.status(time.statusCode).json({ status: time.status })
})

router.post("/recent", async (req: Request, res: Response) => {
	const { length } = req.body
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const { data, status, statusCode } = await recentTimestamp(
		checkToken.token,
		length
	)
	res.status(statusCode).json({ status, data })
})

router.post("/findbydate", async (req: Request, res: Response) => {
	const { date } = req.body
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const { data, status, statusCode } = await findTimestamp(
		date,
		checkToken.token
	)
	res.status(statusCode).json({ status, data })
})
module.exports = router
