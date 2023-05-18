import express, { Request, Response, Router } from "express"
import multer, { Multer } from "multer"
const router: Router = express.Router()
import {
	insertRecords,
	findRecords,
	findById,
	delRecord,
	updateRecord,
} from "../model/Record"

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./upload/")
	},
	filename: (req, file, callback) => {
		const imgExt = file.originalname.split(".")
		const imageNewname = `upload-${Date.now()}.${imgExt[1]}`
		callback(null, imageNewname)
	},
})

const upload = multer({ storage })

// Create new
router.post(
	"/create",
	upload.array("file"),
	async (req: Request, res: Response) => {
		const fileNames: string[] = (req.files as Express.Multer.File[]).map(
			(file: Express.Multer.File) => file.originalname
		)
		const { topic, detail, date } = req.body
		const { status, statusCode } = await insertRecords({
			topic,
			detail,
			date,
			imageName: fileNames.join(","),
		})
		res.status(statusCode).json({ status })
	}
)

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

// Delete record
router.delete("/del/:id", async (req: Request, res: Response) => {
	const recordId: string = req.params.id
	const { status, statusCode } = await delRecord(recordId)
	res.status(statusCode).json({ status })
})

// Update record
router.put("/update/:id", async (req: Request, res: Response) => {
	const recordId: string = req.params.id
	const { topic, detail, date, imageName } = req.body
	const { status, statusCode, data } = await updateRecord(recordId, {
		topic,
		detail,
		date,
		imageName,
	})
	res.status(statusCode).json({ status, data })
})

module.exports = router
