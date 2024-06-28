"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LineService = void 0;
const line = __importStar(require("@line/bot-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const usermember_1 = __importDefault(require("./../model/usermember"));
const checkIsFree_1 = require("../util/checkIsFree");
const flexMessages_1 = require("../util/flexMessages");
dotenv_1.default.config();
class LineService {
    constructor() {
        this.client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
        });
    }
    sendWebhook(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = body;
            const app = yield usermember_1.default.findOne({ userId: userId });
            const appList = app === null || app === void 0 ? void 0 : app.wishList;
            // FLEX LOOP BOX 
            const flexTemplate = yield (0, flexMessages_1.loopBoxMessage)(appList);
            if (event.type === "message") {
                const message = event.message;
                if (message.type === "text") {
                    if (message.text === "รายละเอียด") {
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "แชทนี้จะเกี่ยวกับเกม สามารถ ดูข้อมูล ราคา และจะพัฒนาต่อไปเรื่อยๆ",
                                },
                            ],
                        });
                    }
                    else if (message.text === "เข้าเว็บ") {
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "ยินดีต้อนรับสู่ GameProduct กดลิ้งได้เลยน้าาา \n=> https://liff.line.me/2005244347-lY246dm4 ",
                                },
                            ],
                        });
                    }
                    else if (message.text === "โปรโมชั่น") {
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "ไม่มีโปรงับ เสียใจด้วย--",
                                },
                            ],
                        });
                    }
                    else if (message.text === "ข้อมูลของฉัน") {
                        this.client.getProfile(event.source.userId).then((proflie) => {
                            this.client.replyMessage({
                                replyToken: event.replyToken,
                                messages: [
                                    {
                                        type: "text",
                                        text: `ชื่อของคุณ = ${proflie.displayName}\nสเตตัสของคุณ = ${proflie.statusMessage}`,
                                    },
                                ],
                            });
                        });
                    }
                    else if (message.text === "รอดำเนินการ...") {
                        this.client.getProfile(event.source.userId).then((proflie) => {
                            this.client.replyMessage({
                                replyToken: event.replyToken,
                                messages: [
                                    {
                                        type: "text",
                                        text: `เราขอขอบคุณ คุณ${proflie.displayName}ที่สั่งซื้อสินค้าจากทางเรา...`,
                                    },
                                ],
                            });
                        });
                    }
                    else if (message.text === "รายการโปรด") {
                        // flex message wishlist
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "flex",
                                    altText: "This is a Flex Message",
                                    contents: flexTemplate.contents,
                                },
                            ],
                        });
                    }
                    else if (message.text === "เมนู") {
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "เมนูของเราสามารถกดที่ quickreply ได้เลย",
                                    quickReply: {
                                        items: [
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "เข้าเว็บ",
                                                    text: "เข้าเว็บ",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "รายละเอียด",
                                                    text: "รายละเอียด",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "รายการโปรด",
                                                    text: "รายการโปรด",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "ข้อมูลของฉัน",
                                                    text: "ข้อมูลของฉัน",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "โปรโมชั่น",
                                                    text: "โปรโมชั่น",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        });
                    }
                    else {
                        this.client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "ยินดีต้อนรับสู่ GameProduct ลองพิมพ์หรือกดที่ quickreply ได้เลย...",
                                    quickReply: {
                                        items: [
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "เข้าเว็บ",
                                                    text: "เข้าเว็บ",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "รายละเอียด",
                                                    text: "รายละเอียด",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "รายการโปรด",
                                                    text: "รายการโปรด",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "ข้อมูลของฉัน",
                                                    text: "ข้อมูลของฉัน",
                                                },
                                            },
                                            {
                                                type: "action",
                                                action: {
                                                    type: "message",
                                                    label: "โปรโมชั่น",
                                                    text: "โปรโมชั่น",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        });
                    }
                }
            }
        });
    }
    sendMessageToLine(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { prod_id, prod_img, prod_name, prod_beforeprice, prod_price, url, steamurl } = body;
            const newprice = (0, checkIsFree_1.checkIsFree)(prod_price, prod_beforeprice);
            prod_price = newprice.prod_price;
            prod_beforeprice = newprice.prod_beforeprice;
            const flexContents = yield (0, flexMessages_1.flexMessage)(prod_id, prod_img, prod_name, prod_beforeprice, prod_price, url, steamurl);
            this.client.pushMessage({
                to: userId,
                messages: [
                    {
                        type: "flex",
                        altText: "รหัสสินค้า " + prod_id,
                        contents: flexContents
                    },
                    {
                        type: "text",
                        text: `${steamurl}${prod_id}`,
                    },
                ],
            });
        });
    }
    getProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.getProfile(userId);
            return user;
        });
    }
}
exports.LineService = LineService;
