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
dotenv_1.default.config();
const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
});
class LineService {
    static sendWebhook(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = body;
            if (event.type === "message") {
                const message = event.message;
                if (message.type === "text") {
                    if (message.text === "รายละเอียด") {
                        client.replyMessage({
                            replyToken: event.replyToken,
                            messages: [
                                {
                                    type: "text",
                                    text: "แชทนี้จะเกี่ยวกับเกม สามารถ ดูข้อมูล ราคา และจะพัฒนาต่อไปเรื่อยๆ",
                                },
                            ],
                        });
                    }
                    else if (message.text === "สินค้า") {
                        client.replyMessage({
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
                        client.replyMessage({
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
                        client.getProfile(event.source.userId).then((proflie) => {
                            client.replyMessage({
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
                        client.getProfile(event.source.userId).then((proflie) => {
                            client.replyMessage({
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
                    else {
                        client.replyMessage({
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
                                                    label: "รายละเอียด",
                                                    text: "รายละเอียด",
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
                                                    label: "สินค้า",
                                                    text: "สินค้า",
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
    static sendMessageToLine(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { prod_id, prod_img, prod_name, prod_desc, prod_beforeprice, prod_price, url, steamurl, } = body;
            if (prod_price === 0 ||
                prod_price === null ||
                prod_beforeprice === 0 ||
                prod_beforeprice === null) {
                prod_beforeprice = "-";
                prod_price = "ฟรี";
            }
            else if (prod_beforeprice === prod_price) {
                prod_beforeprice = "-";
                prod_price = "ราคา " + (prod_price / 100).toFixed(0) + " บาท";
            }
            else {
                prod_price = "ลดเหลือ " + (prod_price / 100).toFixed(0) + " บาท";
                prod_beforeprice = "จาก " + (prod_beforeprice / 100).toFixed(0) + " บาท";
            }
            client.pushMessage({
                to: userId,
                messages: [
                    {
                        type: "flex",
                        altText: "รหัสสินค้า " + prod_id,
                        contents: {
                            type: "bubble",
                            hero: {
                                type: "image",
                                url: prod_img,
                                size: "full",
                                aspectRatio: "20:13",
                                aspectMode: "cover",
                                action: {
                                    type: "uri",
                                    uri: url,
                                },
                            },
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: prod_name,
                                        weight: "bold",
                                        size: "xxl",
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "lg",
                                        spacing: "md",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                spacing: "none",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "text",
                                                                text: "รายละเอียด",
                                                                weight: "bold",
                                                                size: "xl",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "text",
                                                                text: prod_desc,
                                                                size: "md",
                                                                margin: "none",
                                                                style: "italic",
                                                                action: {
                                                                    type: "uri",
                                                                    uri: url,
                                                                    label: "Our Website",
                                                                },
                                                                color: "#9290C3",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            footer: {
                                type: "box",
                                layout: "horizontal",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        contents: [
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "text",
                                                        text: "ราคา",
                                                        size: "md",
                                                        color: "#000000",
                                                        weight: "bold",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "box",
                                                layout: "vertical",
                                                contents: [
                                                    {
                                                        type: "box",
                                                        layout: "vertical",
                                                        contents: [
                                                            {
                                                                type: "text",
                                                                text: prod_beforeprice,
                                                                style: "italic",
                                                                size: "sm",
                                                                decoration: "line-through",
                                                                align: "center",
                                                                color: "#B31312",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: "text",
                                                        text: prod_price,
                                                        color: "#22c55e",
                                                        size: "md",
                                                        style: "normal",
                                                        weight: "bold",
                                                        align: "center",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        contents: [
                                            {
                                                type: "button",
                                                action: {
                                                    type: "uri",
                                                    label: "ยืนยัน",
                                                    uri: `${steamurl}${prod_id}`,
                                                },
                                                color: "#ffffff",
                                            },
                                        ],
                                        backgroundColor: "#6842FF",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cornerRadius: "xxl",
                                        borderColor: "#000000",
                                        borderWidth: "none",
                                    },
                                ],
                            },
                        },
                    },
                    {
                        type: "text",
                        text: `${steamurl}${prod_id}`,
                    },
                ],
            });
        });
    }
}
exports.LineService = LineService;
