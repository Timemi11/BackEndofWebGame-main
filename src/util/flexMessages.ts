export const loopBoxMessage = (appList: any) => {
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



