import { Client, Message } from "discord.js"
import humanizeDuration from "humanize-duration"
import millisecond from "millisecond"
import { reply, resetTimer } from "../utils/func"
import { db } from "../utils/stormDb"

export async function interval(message: Message, config: Config) {
    const matches = message.content.match(/\w+/g) || []
    matches.shift()
    let msecs = 0
    for (const tsnip of matches) {
        msecs += millisecond(tsnip)
    }
    if (msecs < 10000) {
        return reply(message, `Duration must be greater than 10 seconds`)
    }
    config.delay = msecs
    db.set("setting.delay", msecs).save()
    resetTimer(config)
    reply(message, `Interval has set to ${humanizeDuration(config.delay, { round: true })}`)
}
