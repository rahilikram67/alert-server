import { Message } from "discord.js"
import { remove } from "lodash"
import { reply, resetTimer } from "../utils/func"
import { db } from "../utils/stormDb"

export async function del(message: Message, config: Config) {
    const matches = message.content.split(" ")
    matches.shift()
    const arr_len = matches.length
    if (arr_len && arr_len > 1) return reply(message, "Commands are incorrect")
    const url = matches[0]
    remove(config.urls, (u) => u == url)
    delete config.previous[url]
    db.set("setting.urls", config.urls as any).save()
    resetTimer(config)
    reply(message, `url ${url} has been removed`)
}