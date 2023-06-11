import { MongoClient, Db, Collection } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
import { responseStatusProps } from "./User"

import { v4 } from "uuid"

const uri: any = process.env.DB_URI
const client: MongoClient = new MongoClient(uri)
const db: Db = client.db()
const collection: Collection = db.collection("timestamp")

interface timeStampProps {
	date: string
	enterTime: string
	leaveTime: string
	uid: string
}

const insertTimestamp = async ({
	date,
	enterTime,
	leaveTime,
	uid,
}: timeStampProps) => {
	let response: responseStatusProps = { status: "", statusCode: 200 }
	if (!date || !enterTime || !leaveTime || !uid) {
		response = {
			status: "Some input is empty please check",
			statusCode: 400,
		}

		return response
	}

	// Check duplicate timestamp
	const timestampToday = await collection
		.find({ date })
		.project({ _id: 0 })
		.toArray()
	if (timestampToday.length > 0) {
		response = {
			status: "You duplicate the timestamp.",
			statusCode: 400,
		}

		return response
	}
	// Insert new timestamp
	const recordId = v4()
	collection.insertOne({ recordId, date, enterTime, leaveTime, uid })
	response = {
		status: "Timestamp saved!",
		statusCode: 200,
	}

	return response
}

export { insertTimestamp }
