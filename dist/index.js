"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./route/product.route"));
const survey_route_1 = __importDefault(require("./route/survey.route"));
const line_route_1 = __importDefault(require("./route/line.route"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// const client = new line.messagingApi.MessagingApiClient({
//   channelAccessToken:
//     "eCR3NwXUmzIqOq8HMYtuXooaWPDEBlszMMeF6BGoyRk4XpK2Ho89HV+hF0IUBuhsTRZYhWxLzRPFV6GyywHaaY7EL4t6uH8KgWUDTh4crPqW560gTHNJC98g+eStkQXgxKUO5StidnjRdPDxScYUHAdB04t89/1O/w1cDnyilFU=",
// });
app.get("/", (_req, res) => {
    res.status(201).json({ message: "Welcome to Auth ts" });
});
app.get("/ping", (_req, res) => {
    res.status(200).json({ message: "Welcome Ping" });
});
app.use(product_route_1.default);
app.use(survey_route_1.default);
// ! ติด Unauth แล้ว status code 401
app.use(line_route_1.default);
// app.get("/products", async (_req: Request, res: Response) => {
//   const data = await Product.find({})
//   res.status(200).json(data);
// });
// app.get("/products/:id", async (req:Request , res:Response ) => {
//    try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ error: "Product not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// app.post("/products", (req:Request, res:Response) => {
//   Product.create(req.body)
//     .then((products) => {
//       res.json(products);
//     })
// });
// app.put("/products/:id", (req:Request, res:Response) => {
//   Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then( (products) => {
//       res.json(products);
//     })
// });
// app.delete("/products/:id", (req:Request, res:Response ) => {
//   Product.findByIdAndDelete(req.params.id,req.body)
//     .then(  (products) => {
//       res.json(products);
//     })
// });
// !Surveys
// app.get("/surveys", (req:Request, res:Response) => {
//   Survey.find()
//     .then((surveys) => {
//       res.json(surveys);
//     })
// });
// app.get("/surveys/:id", (req:Request , res:Response) => {
//   Survey.findById(req.params.id)
//     .then((surveys) => {
//       res.json(surveys);
//     })
// });
// app.post("/surveys", (req:Request, res:Response) => {
//   Survey.create(req.body)
//     .then((surveys) => {
//       res.json(surveys);
//     })
// });
// app.put("/surveys/:id", (req:Request, res:Response) => {
//   Survey.findByIdAndUpdate(req.params.id,req.body)
//     .then( (surveys) => {
//       res.json(surveys);
//     })
// });
// app.delete("/surveys/:id", (req:Request, res:Response) => {
//   Survey.findByIdAndDelete(req.params.id,req.body)
//     .then(  (surveys) => {
//       res.json(surveys);
//     })
// });
// app.post("/webhook", (req: Request, res: Response) => {
//   const event = req.body.events[0] ?? undefined;
//   if (!event) return res.sendStatus(200).end();
//   console.log("event=>", event);
//   if (event.type === "message") {
//     const message = event.message;
//     if (message.type === "text") {
//       if (message.text === "รายละเอียด") {
//         client.replyMessage({
//           replyToken: event.replyToken,
//           messages: [
//             {
//               type: "text",
//               text: "แชทนี้จะเกี่ยวกับเกม สามารถ ดูข้อมูล ราคา และจะพัฒนาต่อไปเรื่อยๆ",
//             },
//           ],
//         });
//       } else if (message.text === "สินค้า") {
//         client.replyMessage({
//           replyToken: event.replyToken,
//           messages: [
//             {
//               type: "text",
//               text: "ยินดีต้อนรับสู่ GameProduct กดลิ้งได้เลยน้าาา \n=> https://liff.line.me/2005244347-lY246dm4 ",
//             },
//           ],
//         });
//       } else if (message.text === "โปรโมชั่น") {
//         client.replyMessage({
//           replyToken: event.replyToken,
//           messages: [
//             {
//               type: "text",
//               text: "ไม่มีโปรงับ เสียใจด้วย--",
//             },
//           ],
//         });
//       } else if (message.text === "ข้อมูลของฉัน") {
//         client.getProfile(event.source.userId).then((proflie) => {
//           client.replyMessage({
//             replyToken: event.replyToken,
//             messages: [
//               {
//                 type: "text",
//                 text: `ชื่อของคุณ = ${proflie.displayName}\nสเตตัสของคุณ = ${proflie.statusMessage}`,
//               },
//             ],
//           });
//         });
//       } else if (message.text === "รอดำเนินการ...") {
//         client.getProfile(event.source.userId).then((proflie) => {
//           client.replyMessage({
//             replyToken: event.replyToken,
//             messages: [
//               {
//                 type: "text",
//                 text: `เราขอขอบคุณ คุณ${proflie.displayName}ที่สั่งซื้อสินค้าจากทางเรา...`,
//               },
//             ],
//           });
//         });
//       } else {
//         client.replyMessage({
//           replyToken: event.replyToken,
//           messages: [
//             {
//               type: "text",
//               text: "ยินดีต้อนรับสู่ GameProduct ลองพิมพ์หรือกดที่ quickreply ได้เลย...",
//               quickReply: {
//                 items: [
//                   {
//                     type: "action",
//                     action: {
//                       type: "message",
//                       label: "รายละเอียด",
//                       text: "รายละเอียด",
//                     },
//                   },
//                   {
//                     type: "action",
//                     action: {
//                       type: "message",
//                       label: "ข้อมูลของฉัน",
//                       text: "ข้อมูลของฉัน",
//                     },
//                   },
//                   {
//                     type: "action",
//                     action: {
//                       type: "message",
//                       label: "สินค้า",
//                       text: "สินค้า",
//                     },
//                   },
//                   {
//                     type: "action",
//                     action: {
//                       type: "message",
//                       label: "โปรโมชั่น",
//                       text: "โปรโมชั่น",
//                     },
//                   },
//                 ],
//               },
//             },
//           ],
//         });
//       }
//     }
//   }
// });
// !หลัง : คือ params ถ้าจะรับ query ก็ต้อง ใช้ req.query
// app.post("/sent-gameproduct/:userId", async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   console.log(req.body);
//   console.log("userId=> " + userId);
//   const { prod_id, url } = req.body;
//   const products = await ProductModel.findById(prod_id);
//   //  รับมาแค่ id อย่างเดียว
//    if  (products) {
//      client.pushMessage({
//         to: userId,
//         messages:[
//           {
//             "type": "flex",
//             "altText": "รหัสสินค้า "+prod_id,
//             "contents": {
//               "type": "bubble",
//               "hero": {
//                 "type": "image",
//                 "url": products.prod_img,
//                 "size": "full",
//                 "aspectRatio": "20:13",
//                 "aspectMode": "cover",
//                 "action": {
//                   "type": "uri",
//                   "uri": url
//                 }
//               },
//               "body": {
//                 "type": "box",
//                 "layout": "vertical",
//                 "contents": [
//                   {
//                     "type": "text",
//                     "text":  products.prod_name,
//                     "weight": "bold",
//                     "size": "xxl"
//                   },
//                   {
//                     "type": "box",
//                     "layout": "vertical",
//                     "margin": "lg",
//                     "spacing": "md",
//                     "contents": [
//                       {
//                         "type": "box",
//                         "layout": "vertical",
//                         "spacing": "none",
//                         "contents": [
//                           {
//                             "type": "box",
//                             "layout": "vertical",
//                             "contents": [
//                               {
//                                 "type": "text",
//                                 "text": "รายละเอียด",
//                                 "weight": "bold",
//                                 "size": "xl"
//                               }
//                             ]
//                           },
//                           {
//                             "type": "box",
//                             "layout": "vertical",
//                             "contents": [
//                               {
//                                 "type": "text",
//                                 "text": products.prod_desc,
//                                 "size": "md",
//                                 "margin": "none",
//                                 "style": "italic",
//                                 "action": {
//                                   "type": "uri",
//                                   "uri": url,
//                                   "label": "Our Website"
//                                 },
//                                 "color": "#9290C3"
//                               }
//                             ]
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               },
//               "footer": {
//                 "type": "box",
//                 "layout": "horizontal",
//                 "contents": [
//                   {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "box",
//                         "layout": "vertical",
//                         "contents": [
//                           {
//                             "type": "text",
//                             "text": "ราคา",
//                             "size": "md",
//                             "color": "#000000",
//                             "weight": "bold"
//                           }
//                         ]
//                       },
//                       {
//                         "type": "box",
//                         "layout": "vertical",
//                         "contents": [
//                           {
//                             "type": "box",
//                             "layout": "vertical",
//                             "contents": [
//                               {
//                                 "type": "text",
//                                 "text": "จาก "+ (products.prod_price + (products.prod_price*50/100)).toFixed(0)+" บาท",
//                                 "style": "italic",
//                                 "size": "sm",
//                                 "decoration": "line-through",
//                                 "align": "center",
//                                 "color": "#B31312"
//                               }
//                             ]
//                           },
//                           {
//                             "type": "text",
//                             "text": "ลดเหลือ "+ products.prod_price.toFixed(0)+" บาท",
//                             "color": "#22c55e",
//                             "size": "md",
//                             "style": "normal",
//                             "weight": "bold",
//                             "align": "center"
//                           }
//                         ]
//                       }
//                     ]
//                   },
//                   {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "button",
//                         "action": {
//                           "type": "message",
//                           "label": "ยืนยัน",
//                           "text": "รอดำเนินการ..."
//                         },
//                         "color": "#ffffff"
//                       }
//                     ],
//                     "backgroundColor": "#6842FF",
//                     "justifyContent": "center",
//                     "alignItems": "center",
//                     "cornerRadius": "xxl",
//                     "borderColor": "#000000",
//                     "borderWidth": "none"
//                   }
//                 ]
//               }
//             }
//           }
//           ,
//           {
//             type:"text",
//             text: `รายละเอียด \n${products.prod_desc}`
//           }
//         ]
//       })
//    }
// });
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
