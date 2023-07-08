import express, { Request, Response, Router } from "express"
import multer, { Multer } from "multer"
const router: Router = express.Router()
import {
	insertRecords,
	findRecords,
	findById,
	delRecord,
	updateRecord,
	getLimitRecord,
	SearchByDate,
} from "../model/Record"
import { verifyAuth, getUserToken } from "../service/UserAuth"

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
		const checkToken = getUserToken(req)
		if (!checkToken.hasToken) {
			res.status(401).json({ status: "unauthorized" })
		}
		const fileNames: string[] = (req.files as Express.Multer.File[]).map(
			(file: Express.Multer.File) => file.filename
		)
		const { topic, detail, date, enterTime, leaveTime } = req.body
		const { status, statusCode } = await insertRecords({
			topic,
			detail,
			date,
			enterTime,
			leaveTime,
			imageName: fileNames.join(","),
			token: checkToken.token,
		})
		res.status(statusCode).json({ status })
	}
)

// Find all records
router.post("/all", async (req: Request, res: Response) => {
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const resData = await findRecords(checkToken.token)
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
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const recordId: string = req.params.id
	const { topic, detail, date, enterTime, leaveTime, imageName } = req.body
	const { status, statusCode, data } = await updateRecord(recordId, {
		topic,
		detail,
		date,
		enterTime,
		leaveTime,
		imageName,
		token: checkToken.token,
	})
	res.status(statusCode).json({ status, data })
})

// Find record with limit
router.post("/limit", async (req: Request, res: Response) => {
	const { limit } = req.body
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const { data, status, statusCode } = await getLimitRecord(
		limit,
		checkToken.token
	)
	res.status(statusCode).json({ status, data })
})

router.post("/searchbydate", async (req: Request, res: Response) => {
	const { date } = req.body
	const checkToken = getUserToken(req)
	if (!checkToken.hasToken) {
		res.status(401).json({ status: "unauthorized" })
	}
	const { status, data, statusCode } = await SearchByDate(
		date,
		checkToken.token
	)

	res.status(statusCode).json({ status, data })
})

module.exports = router
