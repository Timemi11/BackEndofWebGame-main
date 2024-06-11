"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usermember_schema_1 = require("../schema/usermember.schema");
exports.default = mongoose_1.default.model("UserMember", usermember_schema_1.UserMemberSchema);
