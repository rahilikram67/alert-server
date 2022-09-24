import { Message } from "discord.js"


export function reply(message: Message, msg: string) {
    message.reply({
        content: msg
    }).then(res => setTimeout(() => res.delete(), 2000))
}