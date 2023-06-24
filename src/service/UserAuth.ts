import * as jwt from "jsonwebtoken"
import { config } from "../../config/index"
const JWTSecret: string = config.JWTSecret as string
import { Request } from "express"
export interface verifyUserProps {
	id: string
	username: string
	iat: number
}

const verifyAuth = (authToken: any): any => {
	const verify = jwt.verify(authToken, JWTSecret)
	return verify
}

const getUserToken = (req: Request) => {
	const authToken = req.headers.authorization
	const token = authToken?.split(" ")[1] as string
	const hasToken = authToken ? true : false
	return { token, hasToken }
}

export { verifyAuth, getUserToken }
