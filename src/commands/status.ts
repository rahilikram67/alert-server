import { Client, EmbedBuilder, Message } from "discord.js";
import { isEmpty, omit } from "lodash";
import { reply } from "../utils/func";

export async function status(message: Message, config: Config) {
    if (isEmpty(config.previous)) return reply(message, "No entries")
    for (const v of Object.entries(config.previous)) {
        const [url, item] = v
        if (!item) continue
        const { image, market, text } = item
        const rest = omit(item, ["image", "market", "text", "time"])
        let fields = Object.entries(rest).map(e => ({ name: e[0], value: e[1], inline: true }))

        message.channel.send({
            embeds: [new EmbedBuilder()
                .setTitle(text)
                .setAuthor({ name: market })
                .setThumbnail(image)
                .setURL(url)
                .setTimestamp(item.time)
                .setFields(fields)
            ]
        }).catch(err => { })

    }
}