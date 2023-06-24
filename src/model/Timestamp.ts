import { MongoClient, Db, Collection } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
import { responseStatusProps } from "./User"
import { verifyUserProps, verifyAuth } from "../service/UserAuth"
import { v4 } from "uuid"
import { config } from "../../config/index"

const uri: any = config.DB_URI as string
const client: MongoClient = new MongoClient(uri)
const db: Db = client.db()
const collection: Collection = db.collection("timestamp")

interface timeStampProps {
	date: string
	enterTime: string
	leaveTime: string
	token: string
}

const insertTimestamp = async ({
	date,
	enterTime,
	leaveTime,
	token,
}: timeStampProps) => {
	let response: responseStatusProps = { status: "", statusCode: 200 }
	const user: verifyUserProps = verifyAuth(token)
	if (!date || !enterTime || !leaveTime) {
		response = {
			status: "Some input is empty please check",
			statusCode: 400,
		}

		return response
	}

	// Check duplicate timestamp
	const timestampToday = await collection
		.find({ date })
		.filter({ uid: user.id, date })
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
	collection.insertOne({ recordId, date, enterTime, leaveTime, uid: user.id })
	response = {
		status: "Timestamp saved!",
		statusCode: 200,
	}

	return response
}

const recentTimestamp = async (token: string, length: number) => {
	let response: responseStatusProps = { status: "", statusCode: 200 }
	const user: verifyUserProps = verifyAuth(token)
	const data = await collection
		.find({ uid: user.id })
		.project({ _id: 0, uid: 0 })
		.sort({ date: -1 })
		.limit(length)
		.toArray()
	response = { status: "Found timestamp", statusCode: 200, data }
	return response
}

const findTimestamp = async (date: string, token: string) => {
	let response: responseStatusProps = { status: "", statusCode: 200 }
	if (!date) {
		response = { status: "Please send date for get data", statusCode: 400 }
		return response
	}
	const user: verifyUserProps = verifyAuth(token)
	const data = await collection.findOne(
		{ date, uid: user.id },
		{ projection: { _id: 0, recordId: 0, uid: 0 } }
	)
	response = { status: "Found timestamp", statusCode: 200, data }
	return response
}

export { insertTimestamp, recentTimestamp, findTimestamp }
