import { MongoClient, Db } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const uri: any = process.env.DB_URI
const client = new MongoClient(uri)

const db = client.db()

const findUsers = async () => {
	const collection = db.collection("users")
	const users = collection.find().toArray()
	return users
}

export { findUsers }
