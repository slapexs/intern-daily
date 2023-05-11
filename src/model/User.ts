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

interface createUserProps {
	username: string
	password: string
	name: string
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

// Authentication
const authUser = async (username: string, password: string) => {
	const findUser = await checkUser(username)
	if (findUser.length < 1) {
		const response: responseStatusProps = {
			status: "Username was not found",
			statusCode: 401,
		}
		return response
	} else {
		// check match username password
		const passwordMatched = bcrypt.compareSync(password, findUser[0].password)
		if (passwordMatched) {
			const authSecret = "intern-daily"
			const token = await jwt.sign(findUser[0].userId, authSecret)
			const response: responseStatusProps = {
				status: "Password is matched",
				statusCode: 200,
				token: token,
			}
			return response
		} else {
			const response: responseStatusProps = {
				status: "Password is not match",
				statusCode: 401,
			}
			return response
		}
	}
}
export { findUsers, createUser, authUser }
