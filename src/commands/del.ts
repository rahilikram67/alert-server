import { Message } from "discord.js"
import { remove } from "lodash"

export async function del(message: Message, config: Config) {
    const matches = message.content.split(" ")

    matches.shift()

    const arr_len = matches.length
    if (arr_len && arr_len > 1) return message.reply({
        content: "Commands are incorrect"
    }).then(res => setTimeout(() => res.delete(), 2000))

    const url = matches[0]
    remove(config.urls, (u) => u == url)
    delete config.previous[url]

    message.reply({
        content: `url ${url} has been removed`
    }).then(res => setTimeout(() => res.delete(), 2000))

}