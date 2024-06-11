import { Router } from "express";
import { userMemberController } from "../controller/usermember.controller";

const route = Router();

route.get("/usermember", userMemberController.getUserMember);
route.get("/usermember/:id", userMemberController.findUserMemberById);
route.get("/usermember/userid/:id", userMemberController.findUserMemberByUserId);
route.post("/usermember", userMemberController.createProduct);
route.put("/usermember/userid/:id",userMemberController.updateUserMember);
route.delete("/usermember/userid/:id",userMemberController.deleteUserMember);

export default route;