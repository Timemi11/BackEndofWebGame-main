"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usermember_controller_1 = require("../controller/usermember.controller");
const route = (0, express_1.Router)();
route.get("/usermember", usermember_controller_1.userMemberController.getUserMember); //ดู User ทั้งหมด
route.get("/usermember/:id", usermember_controller_1.userMemberController.findUserMemberById); // ดู User ด้วย id ของ mongodb
route.get("/usermember/userid/:id", usermember_controller_1.userMemberController.findUserMemberByUserId); // ดู User ด้วย UserId ของ line
route.get("/usermember/userid/:id/appid", usermember_controller_1.userMemberController.findApp); // ดู App ที่ fav ทั้งหมดของ User
route.get("/usermember/userid/:id/onlyappid", usermember_controller_1.userMemberController.findAppOnlyAppId); // ดู App fav ทั้งหมดของ User แต่เอาแค่ App Id
route.get("/usermember/userid/:id/appid/:appid", usermember_controller_1.userMemberController.findAppId); // ดู App ที่ fav ของ User ด้วย App Id
route.post("/usermember", usermember_controller_1.userMemberController.createProduct); // สร้าง UserMember ใหม่
route.put("/usermember/userid/:id", usermember_controller_1.userMemberController.updateUserMember); // แก้ไขข้อมูล UserMember
route.put("/usermember/userid/:id/appid/:appid", usermember_controller_1.userMemberController.deleteApp); // ลบ App fav ของ User
route.delete("/usermember/userid/:id", usermember_controller_1.userMemberController.deleteUserMember); //ลบ Usermember
exports.default = route;
