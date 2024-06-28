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
exports.getUserProfile = exports.verifyToken = void 0;
const axios_1 = __importDefault(require("axios"));
const baseLineUrl = "https://api.line.me";
const verifyToken = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const endpoint = `${baseLineUrl}/oauth2/v2.1/verify?access_token=${accessToken}`;
        const response = yield axios_1.default.get(endpoint);
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
});
exports.verifyToken = verifyToken;
const getUserProfile = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const endpoint = `${baseLineUrl}/v2/profile?access_token=${accessToken}`;
        const response = yield axios_1.default.get(endpoint, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
});
exports.getUserProfile = getUserProfile;
