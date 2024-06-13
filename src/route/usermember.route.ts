import { Router, Request, Response } from "express";
import { userMemberController } from "../controller/usermember.controller";
import UserMemberModel from "./../model/usermember";
const route = Router();

route.get("/usermember", userMemberController.getUserMember); //ดู User ทั้งหมด
route.get("/usermember/:id", userMemberController.findUserMemberById); // ดู User ด้วย id ของ mongodb
route.get(
  "/usermember/userid/:id",
  userMemberController.findUserMemberByUserId
); // ดู User ด้วย UserId ของ line
route.get("/usermember/userid/:id/appid", userMemberController.findApp); // ดู App ที่ fav ทั้งหมดของ User
route.get(
  "/usermember/userid/:id/onlyappid",
  userMemberController.findAppOnlyAppId
); // ดู App fav ทั้งหมดของ User แต่เอาแค่ App Id
route.get(
  "/usermember/userid/:id/appid/:appid",
  userMemberController.findAppId
); // ดู App ที่ fav ของ User ด้วย App Id
route.post("/usermember", userMemberController.createProduct); // สร้าง UserMember ใหม่
route.put("/usermember/userid/:id", userMemberController.updateUserMember); // แก้ไขข้อมูล UserMember
route.put(
  "/usermember/userid/:id/appid/:appid",
  userMemberController.deleteApp
); // ลบ App fav ของ User
route.delete("/usermember/userid/:id", userMemberController.deleteUserMember); //ลบ Usermember

export default route;
