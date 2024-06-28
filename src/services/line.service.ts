import * as line from "@line/bot-sdk";
import dotenv from "dotenv";
import UserMemberModel from "./../model/usermember";
import { FlexContainer } from "@line/bot-sdk/dist/messaging-api/model/flexContainer";
import { checkIsFree } from "../util/checkIsFree";

dotenv.config();

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
});

export class LineService {
  static async sendWebhook(body: any, userId: string) {
    const event = body;
    const app = await UserMemberModel.findOne({ userId: userId });
    const appList = app?.wishList;

    // const wishListText = appList?.map((item: any) => item.name).join(" ") || "";

    // const steamUrlGame = "https://store.steampowered.com/app/$appId";

    // ============== FLEX LOOP BOX ===============
    function generateFlexContents(items: any) {
      const contents: any = [];

      items.forEach((item: any, index: any) => {
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
    }
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

    // ============ FLEX LOOP BOX END ================

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
        } else if (message.text === "เข้าเว็บ") {
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
          // flex message wishlist
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "flex",
                altText: "This is a Flex Message",
                contents: flexTemplate.contents as FlexContainer,
              },
            ],
          });
        } else if (message.text === "เมนู") {
          client.replyMessage({
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

    const newprice = checkIsFree(prod_price, prod_beforeprice);
    prod_price = newprice.prod_price
    prod_beforeprice = newprice.prod_beforeprice
    console.log(prod_price + " " + prod_beforeprice)


    const flexContents: FlexContainer = {
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
    }
    client.pushMessage({
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
  }














}
