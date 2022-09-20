import { Message } from "discord.js"
import { repeater } from "../discord"


export function resetTimer(config: Config) {
    clearTimeout(config.timer)
    repeater(config as any)
}

export function reply(message: Message, msg: string) {
    message.reply({
        content: msg
    }).then(res => setTimeout(() => res.delete(), 2000))
}