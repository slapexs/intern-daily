import { MongoClient, Db, Collection } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
import { responseStatusProps } from "./User"
import { v4 } from "uuid"

const uri: any = process.env.DB_URI
const client: MongoClient = new MongoClient(uri)
const db: Db = client.db()
const collection: Collection = db.collection("records")

// Insert new record
interface recordProps {
	topic: string
	detail: string
	date: string
	imageName: string
}
const insertRecords = async ({
	topic,
	detail,
	date,
	imageName,
}: recordProps) => {
	// check empty
	if (!topic || !detail || !date || !imageName) {
		const response: responseStatusProps = {
			status: "Some input is empty please check",
			statusCode: 400,
		}

		return response
	} else {
		// Insert new record
		const recordId = v4()
		collection.insertOne({ recordId, topic, detail, date, imageName })
		const response: responseStatusProps = {
			status: "New record inserted!",
			statusCode: 200,
		}
		return response
	}
}

export { insertRecords }
