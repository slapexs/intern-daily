import express, { Request, Response, Router } from "express"
const router: Router = express.Router()
import { insertRecords } from "../model/Record"

// Create new
router.post("/create", async (req: Request, res: Response) => {
	const { status, statusCode } = await insertRecords(req.body)
	res.status(statusCode).json({ status })
})

module.exports = router
