import express, { Request, Response, Router } from "express"
const router: Router = express.Router()
import { insertRecords, findRecords } from "../model/Record"

// Create new
router.post("/create", async (req: Request, res: Response) => {
	const { status, statusCode } = await insertRecords(req.body)
	res.status(statusCode).json({ status })
})

// Find all records
router.get("/all", async (req: Request, res: Response) => {
	const resData = await findRecords()
	res.send(resData)
})

module.exports = router
