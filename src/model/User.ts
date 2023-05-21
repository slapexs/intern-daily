import { MongoClient, Db, Collection } from "mongodb"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import * as jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

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
	const user = await collection.find({ username }).project({ _id: 0 }).toArray()
	return user
}

export interface createUserProps {
	username: string
	password: string
	name: string
}

const findUserById = async (userId: string | jwt.JwtPayload) => {
	const user = await collection.findOne({ userId })
	return user
}

export interface responseStatusProps {
	status: string
	statusCode: number
	token?: any
	data?: string | any
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
		const userId: string = uuidv4()
		// Create new user
		collection.insertOne({ userId, username, password: hashedPassword, name })
		const response: responseStatusProps = {
			status: "User created",
			statusCode: 201,
		}
		return response
	}
}

export { checkUser, findUsers, createUser, findUserById }
