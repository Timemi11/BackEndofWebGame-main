"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const line_controller_1 = require("../controller/line.controller");
const route = (0, express_1.Router)();
route.post("/webhook", line_controller_1.LineController.sendWebhook);
route.post("/sent-gameproduct/:userId", line_controller_1.LineController.sendMessageToLine);
exports.default = route;
