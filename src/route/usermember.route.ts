import { Router, Request, Response } from "express";
import { userMemberController } from "../controller/usermember.controller";
import UserMemberModel from "./../model/usermember";
const route = Router();

route.get("/usermember", userMemberController.getUserMember);
route.get("/usermember/:id", userMemberController.findUserMemberById);
route.get(
  "/usermember/userid/:id",
  userMemberController.findUserMemberByUserId
);
route.get(
  "/usermember/userid/:id/appid/:appid",
  userMemberController.findAppId
);
route.get("/usermember/userid/:id/appid", userMemberController.findApp);
route.post("/usermember", userMemberController.createProduct);
route.put("/usermember/userid/:id", userMemberController.updateUserMember);
route.put(
  "/usermember/userid/:id/appid/:appid",
  userMemberController.deleteApp
);
route.delete("/usermember/userid/:id", userMemberController.deleteUserMember);

export default route;
