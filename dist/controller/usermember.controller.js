"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMemberController = void 0;
const usermember_service_1 = require("../services/usermember.service");
class userMemberController {
    static getUserMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //let product = await ProductService.getProduct()
            let userMember = yield usermember_service_1.userMemberService.getUserMember();
            return res.status(200).json(userMember);
        });
    }
    static findUserMemberById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userMember = yield usermember_service_1.userMemberService.findUserMemberById(req.params.id);
            return res.status(200).json(userMember);
        });
    }
    static findUserMemberByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userMember = yield usermember_service_1.userMemberService.findUserMemberByUserId(req.params.id);
                if (userMember) {
                    res.status(200).json(userMember);
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static findApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userMember = yield usermember_service_1.userMemberService.findApp(req.params.id);
            res.status(200).json(userMember);
        });
    }
    static findAppId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let userMember = yield usermember_service_1.userMemberService.findAppId(req.params.id, req.params.appid);
            if (userMember === null || userMember === void 0 ? void 0 : userMember.length) {
                res.status(200).json(userMember);
            }
            else {
                res.status(404).json({ message: "Appid not found" });
            }
        });
    }
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_service_1.userMemberService.createUserMember(req.body);
            return res.status(200).json(userMember);
        });
    }
    static updateUserMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_service_1.userMemberService.updateUserMember(req.params.id, req.body);
            return res.status(200).json(userMember);
        });
    }
    static deleteUserMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_service_1.userMemberService.deleteUserMember(req.params.id);
            return res.status(200).json(userMember);
        });
    }
    static deleteApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResult = yield usermember_service_1.userMemberService.deleteUserMemberApp(req.params.id, req.params.appid);
                return res.status(200).json(updateResult);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Internal server error", error: error.message });
            }
        });
    }
}
exports.userMemberController = userMemberController;
