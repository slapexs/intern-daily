import * as jwt from "jsonwebtoken"
import { config } from "../../config/index"
const JWTSecret: string = config.JWTSecret as string

const verifyAuth = (authToken: any) => {
	const verify = jwt.verify(authToken, JWTSecret)
	return verify
}

export { verifyAuth }
