import { Client, Collection, DMChannel, EmbedBuilder, Message } from "discord.js";
import { isEmpty, omit } from "lodash";

export async function status(message: Message, config: Config & { client: Client }) {
    if (isEmpty(config.previous)) return message.reply("No entries").then(res => setTimeout(() => res.delete(), 2000)).catch((e) => console.error(e))

    const channels: Collection<string, DMChannel> = config.client.channels.cache.filter((c: any) => !c.type) as any
    for (const v of Object.entries(config.previous)) {
        const [url, item] = v
        if (!item) continue
        const { image, market, text } = item
        const rest = omit(item, ["image", "market", "text", "time"])
        let fields = Object.entries(rest).map(e => ({ name: e[0], value: e[1], inline: true }))

        channels.map(channel => channel.send({
            embeds: [new EmbedBuilder()
                .setTitle(text)
                .setAuthor({ name: market })
                .setThumbnail(image)
                .setURL(url)
                .setTimestamp(item.time)
                .setFields(fields)
            ]
        }).catch(err => { }))

    }
}