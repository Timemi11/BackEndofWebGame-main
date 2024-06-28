import * as line from "@line/bot-sdk";
import dotenv from "dotenv";
import UserMemberModel from "./../model/usermember";
import { FlexContainer } from "@line/bot-sdk/dist/messaging-api/model/flexContainer";
import { checkIsFree } from "../util/checkIsFree";
import { MessagingApiClient } from "@line/bot-sdk/dist/messaging-api/api/messagingApiClient";
import { flexMessage, loopBoxMessage } from "../util/flexMessages";

dotenv.config();

export class LineService {
  private client: MessagingApiClient

  constructor() {
    this.client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    });
  }

  async sendWebhook(body: any, userId: string) {
    const event = body;
    const app = await UserMemberModel.findOne({ userId: userId });
    const appList = app?.wishList;

    // FLEX LOOP BOX 
    const flexTemplate = await loopBoxMessage(appList)
    
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
        } else if (message.text === "เข้าเว็บ") {
          this.client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "ยินดีต้อนรับสู่ GameProduct กดลิ้งได้เลยน้าาา \n=> https://liff.line.me/2005244347-lY246dm4 ",
              },
            ],
          });
        } else if (message.text === "โปรโมชั่น") {
          this.client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "ไม่มีโปรงับ เสียใจด้วย--",
              },
            ],
          });
        } else if (message.text === "ข้อมูลของฉัน") {
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
        } else if (message.text === "รอดำเนินการ...") {
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
        } else if (message.text === "รายการโปรด") {
          // flex message wishlist
          this.client.replyMessage({
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
        } else {
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
  }

  async sendMessageToLine(userId: string, body: any) {
    let {
      prod_id,
      prod_img,
      prod_name,
      prod_beforeprice,
      prod_price,
      url,
      steamurl
    } = body;

    const newprice = checkIsFree(prod_price, prod_beforeprice);
    prod_price = newprice.prod_price
    prod_beforeprice = newprice.prod_beforeprice

    const flexContents = await flexMessage(
      prod_id,
      prod_img,
      prod_name,
      prod_beforeprice,
      prod_price,
      url,
      steamurl)

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
  }


  async getProfileByUserId(userId: string) {
    const user = await this.client.getProfile(userId);
    return user
  }











}
