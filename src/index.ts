import express, { Express, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port: number = 5000

// Extension express
app.use(express.json())
app.use(cors())

// Home page
app.get("/", (req: Request, res: Response) =>
	res.status(200).json({ status: "ok" })
)

app.listen(port, () => console.log(`Server running on port ${port}`))
