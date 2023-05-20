import express, { Router, Request, Response } from "express"
const router: Router = express.Router()
import path = require("path")
// Get image
router.get("/:imageName", (req: Request, res: Response) => {
	const { imageName } = req.params
	const pathjoin = path.join(__dirname, "../../", "upload", imageName)

	res.sendFile(pathjoin)
})
module.exports = router
