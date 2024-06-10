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
exports.LineController = void 0;
const line_service_1 = require("../services/line.service");
class LineController {
    static sendWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = (_a = req.body.events[0]) !== null && _a !== void 0 ? _a : undefined;
            if (!body)
                return res.sendStatus(200).end();
            const result = yield line_service_1.LineService.sendWebhook(body);
            return res.status(200).json(result); //optional return
        });
    }
    static sendMessageToLine(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const body = req.body;
            const result = yield line_service_1.LineService.sendMessageToLine(userId, body);
            return res.status(200).json(result); //optional return
        });
    }
}
exports.LineController = LineController;
