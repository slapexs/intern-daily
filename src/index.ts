import express, { Application, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
// Router
const userRouter = require("./routers/User")
const recordRouter = require("./routers/Record")

const app: Application = express()
const port: number = 5000

// Extension express
app.use(express.json())
app.use(cors())

// Home page
app.get("/", (req: Request, res: Response) =>
	res.status(200).json({ status: "ok" })
)

// Controller
app.use("/user", userRouter)
app.use("/record", recordRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))
