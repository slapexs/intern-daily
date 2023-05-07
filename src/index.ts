import express, { Express, Request, Response } from "express"

const app: Express = express()
const port: number = 5000

// Home page
app.get("/", (req: Request, res: Response) =>
	res.status(200).json({ status: "ok" })
)

app.listen(port, () => console.log(`Server running on port ${port}`))
