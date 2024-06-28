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
exports.lineMiddleware = void 0;
const line_1 = require("../util/line");
const lineMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authentication = req.headers.authorization;
    if (!authentication) {
        return res.status(401).json({ message: "No Authorization header" });
    }
    const [type, token] = authentication.split(" ");
    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid Authorization header" });
    }
    try {
        yield (0, line_1.verifyToken)(token);
        const userProfile = yield (0, line_1.getUserProfile)(token);
        return res.status(200).json(userProfile);
        next();
    }
    catch (error) {
        console.log(error);
        throw new Error(error); // error
    }
});
exports.lineMiddleware = lineMiddleware;
