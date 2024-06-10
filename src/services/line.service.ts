import ProductModel from "../model/product";
import * as line from "@line/bot-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
});

export class LineService {
  static async sendWebhook(body: any) {
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
        } else if (message.text === "สินค้า") {
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "ยินดีต้อนรับสู่ GameProduct กดลิ้งได้เลยน้าาา \n=> https://liff.line.me/2005244347-lY246dm4 ",
              },
            ],
          });
        } else if (message.text === "โปรโมชั่น") {
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "ไม่มีโปรงับ เสียใจด้วย--",
              },
            ],
          });
        } else if (message.text === "ข้อมูลของฉัน") {
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
        } else if (message.text === "รอดำเนินการ...") {
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
        } else {
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
  }

  static async sendMessageToLine(userId: string, body: any) {
    const { prod_id, url } = body;
    const products = await ProductModel.findById(prod_id);
    if (products) {
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
                url: products.prod_img,
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
                    text: products.prod_name,
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
                                text: products.prod_desc,
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
                                text:
                                  "จาก " +
                                  (
                                    products.prod_price +
                                    (products.prod_price * 50) / 100
                                  ).toFixed(0) +
                                  " บาท",
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
                            text:
                              "ลดเหลือ " +
                              products.prod_price.toFixed(0) +
                              " บาท",
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
                          type: "message",
                          label: "ยืนยัน",
                          text: "รอดำเนินการ...",
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
            text: `รายละเอียด \n${products.prod_desc}`,
          },
        ],
      });
    }
  }
}
