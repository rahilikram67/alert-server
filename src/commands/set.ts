import { Message } from "discord.js";
import { reply, resetTimer } from "../utils/func";
import { db } from "../utils/stormDb";

export function set(message: Message, config: Config) {

    const matches = message.content.split(" ")

    matches.shift()

    const arr_len = matches.length

    if (!arr_len) return reply(message, "Commands are incorrect")

    let temp = ""
    for (const str of matches) {
        if (!str.includes("=")) return
        const [key, value] = str.split("=")
        if (!value) return
        config.channelMap[key] = value
        temp += `${key}=${value}\n`
    }
    db.set(`setting.channelMap`, config.channelMap).save()
    resetTimer(config)
    reply(message, temp)
}