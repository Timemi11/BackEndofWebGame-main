"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const line_controller_1 = require("../controller/line.controller");
const line_middleware_1 = require("../middleware/line.middleware");
const route = (0, express_1.Router)();
route.post("/webhook", line_controller_1.LineController.sendWebhook);
route.post("/sent-gameproduct/:userId", line_controller_1.LineController.sendMessageToLine);
route.get("/get-profile", line_middleware_1.lineMiddleware, line_controller_1.LineController.getProfile);
exports.default = route;
