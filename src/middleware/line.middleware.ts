import { Request, Response, NextFunction } from "express"
import { getUserProfile, verifyToken } from "../util/line"

export const lineMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authentication = req.headers.authorization
    if (!authentication) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const [type, token] = authentication.split(" ")

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        await verifyToken(token)
        const userProfile = await getUserProfile(token)
        return userProfile
    }
    catch (error: any) {
        console.log(error)
        throw new Error(error) // error
    }

}