import { AxiosError } from "axios"
import { Message } from "discord.js"
import { union } from "lodash"

export function printErr(e: AxiosError, config: Config) {
    if (e.response?.status !== 403) return
    const url = e.response?.config.url
    console.error(url, " failed status:" + e?.response?.status)
    config._403 = config._403 ? union(config._403, [url]) : [url] as any
}

export function messageSendError(message: Message) {
    message.channel.send("Error occured at server side\nContact Dev!").catch(err => { })
}