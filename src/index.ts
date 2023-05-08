import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port: number = 5000

// Extension express
app.use(express.json())
app.use(cors())

// Router
const loginRouter = require("./routers/Create")

// Home page
app.get("/", (req: Request, res: Response) =>
	res.status(200).json({ status: "ok" })
)

// Controller
app.use("/auth", loginRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))
