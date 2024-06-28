import { Request, Response, NextFunction } from "express"
import { getUserProfile, verifyToken } from "../util/line"

export const lineMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authentication = req.headers.authorization
    
    if (!authentication) {
        return res.status(401).json({ message: "No Authorization header" })
    }

    const [type, token] = authentication.split(" ")

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid Authorization header" })
    }


    try {
        await verifyToken(token)
        const userProfile = await getUserProfile(token)
        req.body.userId = userProfile.userId
        next()
    }
    catch (error: any) {
        console.log(error)
        throw new Error(error) // error
    }

}