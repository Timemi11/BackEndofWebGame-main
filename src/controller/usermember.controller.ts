import { userMemberService } from "../services/usermember.service";
import { Request, Response, NextFunction } from "express";

export class userMemberController{
    static async getUserMember(req: Request, res: Response, next: NextFunction){
        //let product = await ProductService.getProduct()
        let userMember = await userMemberService.getUserMember();
        return res.status(200).json(userMember)
    }

    static async findUserMemberById(req: Request, res: Response, next: NextFunction){
        let userMember = await userMemberService.findUserMemberById(req.params.id);
        return res.status(200).json(userMember);
    }

    static async findUserMemberByUserId(req: Request, res: Response, next: NextFunction){
        try {
            let userMember = await userMemberService.findUserMemberByUserId(req.params.id);
            if (userMember) {
                res.status(200).json(userMember);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async createProduct(req: Request, res: Response, next: NextFunction){
        const userMember =  await userMemberService.createUserMember(req.body);
        return res.status(200).json(userMember)
    }

    static async updateUserMember(req: Request, res: Response, next: NextFunction){
        const userMember = await userMemberService.updateUserMember(req.params.id,req.body);
        return res.status(200).json(userMember)
    }

    static async deleteUserMember(req: Request, res: Response, next: NextFunction){
        const userMember = await userMemberService.deleteUserMember(req.params.id);
        return res.status(200).json(userMember);
    }


}