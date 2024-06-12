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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMemberService = void 0;
const usermember_1 = __importDefault(require("./../model/usermember"));
class userMemberService {
    static getUserMember() {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.find({});
            return userMember;
        });
    }
    static findUserMemberById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.findById(id);
            return userMember;
        });
    }
    static findUserMemberByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.findOne({ userId: id });
            return userMember;
        });
    }
    static findAppId(id, appId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.findOne({ userId: id });
            if (userMember) {
                const appIds = userMember.wishList.filter((item) => item.appId === Number(appId))
                    .map((item) => item.appId);
                return appIds;
            }
        });
    }
    static createUserMember(newUserMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.create(newUserMember);
            return userMember;
        });
    }
    static updateUserMember(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.findOneAndUpdate({ userId: id }, newData);
            return userMember;
        });
    }
    static deleteUserMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userMember = yield usermember_1.default.findOneAndDelete({ userId: id });
            return userMember;
        });
    }
}
exports.userMemberService = userMemberService;
