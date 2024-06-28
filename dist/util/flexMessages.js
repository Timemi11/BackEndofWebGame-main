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
exports.flexMessage = exports.loopBoxMessage = void 0;
const loopBoxMessage = (appList) => __awaiter(void 0, void 0, void 0, function* () {
    const flexContents = generateFlexContents(appList);
    const flexTemplate = {
        contents: {
            type: "bubble",
            header: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: "♥️ รายการโปรด ♥️", // Replace with your header text
                        size: "xl",
                        align: "center",
                    },
                ],
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: flexContents,
            },
        },
    };
    return flexTemplate;
});
exports.loopBoxMessage = loopBoxMessage;
const generateFlexContents = (items) => {
    const contents = [];
    items.forEach((item, index) => {
        contents.push({
            type: "box",
            layout: "horizontal",
            contents: [
                {
                    type: "text",
                    text: item.name,
                    wrap: true,
                    weight: "bold",
                    size: "md",
                    flex: 4,
                },
                {
                    type: "text",
                    color: "#3ABEF9",
                    action: {
                        type: "uri",
                        uri: `https://store.steampowered.com/app/${item.appId}`,
                        label: "action",
                    },
                    text: "Link",
                    align: "end",
                },
            ],
        });
        // Add a separator after each item, except the last one
        if (index < items.length - 1) {
            contents.push({
                type: "separator",
                margin: "md",
            });
        }
    });
    return contents;
};
const flexMessage = (prod_id, prod_img, prod_name, prod_beforeprice, prod_price, url, steamurl) => __awaiter(void 0, void 0, void 0, function* () {
    const flexContents = {
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
                                label: "เข้า Steam!!",
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
    };
    return flexContents;
});
exports.flexMessage = flexMessage;
