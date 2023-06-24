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
	if (!topic || !detail || !date) {
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

// Find all records
const findRecords = async () => {
	const records = await collection.find().project({ _id: 0 }).toArray()
	return records
}

// Find record by id
const findById = async (recordId: string) => {
	if (!recordId) {
		const response: responseStatusProps = {
			status: "Record ID is empty please check",
			statusCode: 400,
		}
		return response
	} else {
		const filter = { recordId }
		const projection = { _id: 0 }
		const record = await collection.findOne(filter, { projection })
		const response: responseStatusProps = {
			status: "Found record",
			statusCode: 200,
			data: record,
		}
		return response
	}
}

// Delete record by id
const delRecord = (recordId: string) => {
	if (!recordId) {
		const response: responseStatusProps = {
			status: "Record ID is empty please check",
			statusCode: 400,
		}
		return response
	} else {
		collection.deleteOne({ recordId })
		const response: responseStatusProps = {
			status: `${recordId} has deleted`,
			statusCode: 200,
		}
		return response
	}
}

// Update record
const updateRecord = async (
	recordId: string,
	{ topic, detail, date, imageName }: recordProps
) => {
	if (!recordId) {
		const response: responseStatusProps = {
			status: "Record ID is empty please check",
			statusCode: 400,
		}
		return response
	} else {
		const filter = { recordId }
		const update = { $set: { topic, detail, date, imageName } }
		collection.updateOne(filter, update)
		const { data } = await findById(recordId)
		const response: responseStatusProps = {
			status: `record: ${recordId} has updated`,
			statusCode: 200,
			data,
		}
		return response
	}
}

const getLimitRecord = async (limit: number) => {
	let response: responseStatusProps = { status: "", statusCode: 200 }
	// if (!uid) {
	// 	response = { status: "", statusCode: 401 }
	// 	return response
	// }

	const records = await collection
		.find()
		.limit(limit)
		.project({ _id: 0, detail: 0, imageName: 0 })
		.toArray()
	response = { status: "Found record", statusCode: 200, data: records }
	return response
}
export {
	insertRecords,
	findRecords,
	findById,
	delRecord,
	updateRecord,
	getLimitRecord,
}
