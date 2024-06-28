import { FlexContainer } from "@line/bot-sdk/dist/messaging-api/model/flexContainer";


export const loopBoxMessage = async (appList: any) => {
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
    return flexTemplate
}

const generateFlexContents = (items: any) => {
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

export const flexMessage = async (
    prod_id: any,
    prod_img: any,
    prod_name: any,
    prod_beforeprice: any,
    prod_price: any,
    url: any,
    steamurl: any) => {


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
        body: {
            type: "box",
            layout: "vertical",
            contents: [
                {
                    type: "text",
                    text: prod_name,
                    wrap: true,
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
    }



    return flexContents
}


