import { Client, Collection, DMChannel, Message } from "discord.js"
import humanizeDuration from "humanize-duration"
import millisecond from "millisecond"
import { repeater } from "../discord"


export async function interval(message: Message, config: Config & { client: Client }) {
    config.lock = true
    const matches = message.content.match(/\w+/g) || []
    matches.shift()
    let msecs = 0
    if (!matches[0]) return config.lock = false
    clearTimeout(config.timer)
    for (const tsnip of matches) {
        msecs += millisecond(tsnip)
    }
    config.delay = msecs
    repeater(config)
    // change end
    config.lock = false
    message.reply({
        content: `Interval has set to ${humanizeDuration(config.delay, { round: true })}`
    }).then(res => setTimeout(() => res.delete(), 2000))
}
