import express, { Request, Response, Router } from "express"
const router: Router = express.Router()
import { insertRecords, findRecords, findById } from "../model/Record"

// Create new
router.post("/create", async (req: Request, res: Response) => {
	const { status, statusCode } = await insertRecords(req.body)
	res.status(statusCode).json({ status })
})

// Find all records
router.get("/all", async (req: Request, res: Response) => {
	const resData = await findRecords()
	res.status(200).json({ records: resData })
})

// Find record by id
router.get("/find/:id", async (req: Request, res: Response) => {
	const recordId: string = req.params.id
	const { status, statusCode, data } = await findById(recordId)
	if (statusCode == 200) {
		res.status(statusCode).json({ data })
	} else {
		res.status(statusCode).json({ status })
	}
})

module.exports = router
