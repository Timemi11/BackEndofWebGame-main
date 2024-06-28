import { userMemberService } from "../services/usermember.service";
import { Request, Response, NextFunction } from "express";

export class userMemberController {
  static async getUserMember(req: Request, res: Response, next: NextFunction) {
    let userMember = await userMemberService.getUserMember();
    return res.status(200).json(userMember);
  }

  static async findUserMemberById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let userMember = await userMemberService.findUserMemberById(req.params.id);
    return res.status(200).json(userMember);
  }

  static async findUserMemberByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let userMember = await userMemberService.findUserMemberByUserId(
        req.params.id
      );
      if (userMember) {
        return res.status(200).json(userMember);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAppOnlyAppId(req: Request, res: Response, next: NextFunction) {
    let userMember: any = await userMemberService.findAppOnlyAppId(req.params.id)
    return res.status(200).json(userMember);
  }

  static async findApp(req: Request, res: Response, next: NextFunction) {
    let userMember = await userMemberService.findApp(req.params.id);
    return res.status(200).json(userMember);
  }

  static async findAppId(req: Request, res: Response, next: NextFunction) {
    let userMember = await userMemberService.findAppId(
      req.params.id,
      req.params.appid
    );
    if (userMember?.length) {
      return res.status(200).json(userMember);
    } else {
      return res.status(404).json({ message: "Appid not found" });
    }
  }

  static async createProduct(req: Request, res: Response, next: NextFunction) {
    const userMember = await userMemberService.createUserMember(req.body);
    return res.status(200).json(userMember);
  }

  static async updateUserMember(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userMember = await userMemberService.updateUserMember(
      req.params.id,
      req.body
    );
    return res.status(200).json(userMember);
  }

  static async deleteUserMember(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userMember = await userMemberService.deleteUserMember(req.params.id);
    return res.status(200).json(userMember);
  }

  static async deleteApp(req: Request, res: Response, next: NextFunction) {
    try {
      const updateResult = await userMemberService.deleteUserMemberApp(
        req.params.id,
        req.params.appid
      );
      return res.status(200).json(updateResult);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}
