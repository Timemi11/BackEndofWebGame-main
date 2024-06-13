import * as line from "@line/bot-sdk";
import dotenv from "dotenv";
import UserMemberModel from "./../model/usermember";

dotenv.config();

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
});

export class LineService {
  static async sendWebhook(body: any, userId: string) {
    const event = body;
    const app = await UserMemberModel.findOne({ userId: userId });
    const appList = app?.wishList;

    const wishListText = appList?.map((item: any) => item.name).join(" ") || "";

    // const steamUrlGame = "https://store.steampowered.com/app/$appId";

    const flexContents =
      appList?.map((item: any) => ({
        type: "bubble",
        size: "giga",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "รายการโปรด",
              weight: "bold",
              size: "xxl",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "box",
              layout: "horizontal",
              contents: [
                {
                  type: "text",
                  text: item.name, // แสดงชื่อเกม
                  align: "start",
                  flex: 4,
                },
                {
                  type: "text",
                  text: "เลือกดู",
                  align: "end",
                  action: {
                    type: "uri",
                    label: "action",
                    uri: `https://store.steampowered.com/app/${item.appId}`, // ลิงก์เป็นลิงก์ของเกม
                  },
                },
              ],
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          ],
          flex: 0,
          alignItems: "flex-start",
          justifyContent: "center",
        },
      })) || [];

    const flexMessage: any = {
      type: "flex" as const,
      altText: "รายการโปรดของคุณ",
      contents: {
        type: "bubble",
        contents: flexContents,
      },
    };

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
        } else if (message.text === "รายการโปรด") {
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [flexMessage],
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
                        label: "รายการโปรด",
                        text: "รายการโปรด",
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
    let {
      prod_id,
      prod_img,
      prod_name,
      prod_desc,
      prod_beforeprice,
      prod_price,
      url,
      steamurl,
    } = body;

    if (
      prod_price === 0 ||
      prod_price === null ||
      prod_beforeprice === 0 ||
      prod_beforeprice === null
    ) {
      prod_beforeprice = "-";
      prod_price = "ฟรี";
    } else if (prod_beforeprice === prod_price) {
      prod_beforeprice = "-";
      prod_price = "ราคา " + (prod_price / 100).toFixed(0) + " บาท";
    } else if (prod_beforeprice === "notGet") {
      prod_beforeprice = "-";
      prod_price = "ราคา " + (prod_price / 100).toFixed(0) + " บาท";
    } else {
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
          },
        },
        {
          type: "text",
          text: `${steamurl}${prod_id}`,
        },
      ],
    });
  }
}
