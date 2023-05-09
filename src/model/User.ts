import { MongoClient, Db, Collection } from "mongodb"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const uri: any = process.env.DB_URI
const client: MongoClient = new MongoClient(uri)
const db: Db = client.db()
const collection: Collection = db.collection("users")

// Function get all user
const findUsers = async () => {
	const users = collection.find().toArray()
	return users
}

// Function check user already
const checkUser = async (username: string) => {
	const user = await collection.find({ username }).toArray()
	return user
}

interface createUserProps {
	username: string
	password: string
	name: string
}

interface responseStatusProps {
	status: string
	statusCode: number
}
const createUser = async ({ username, password, name }: createUserProps) => {
	const user = await checkUser(username)
	if (user.length > 0) {
		const response: responseStatusProps = {
			status: "Username already exists",
			statusCode: 401,
		}
		return response
	} else {
		const salt = 10
		const hashedPassword = bcrypt.hashSync(password, salt)
		// Create new user
		collection.insertOne({ username, password: hashedPassword, name })
		const response: responseStatusProps = {
			status: "User created",
			statusCode: 201,
		}
		return response
	}
}

export { findUsers, createUser }
