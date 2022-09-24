import { Message } from "discord.js";
import { reply } from "../utils/func";
import { db } from "../utils/stormDb";

export function set(message: Message, config: Config) {

    const matches = message.content.split(/\s+/g)

    matches.shift()

    const arr_len = matches.length

    if (!arr_len) return reply(message, "Commands are incorrect")

    let temp = ""
    for (const str of matches) {
        if (!str.includes("=")) return
        const [key, value] = str.split("=")
        if (!value || !["hibbett", "jdsports", "finishline"].includes(value) || !/^\d+$/g.test(key)) return reply(message,"Error please type !info to see how to type command")
        config.channelMap[key] = value
        temp += `${key}=${value}\n`
    }
    db.set(`setting.channelMap`, config.channelMap).save()

    reply(message, temp)
}