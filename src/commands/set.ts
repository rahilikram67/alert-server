import { Message } from "discord.js";
import { reply, resetTimer } from "../utils/func";

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
    resetTimer(config)
    reply(message, temp)
}