import { Client } from "discord.js";



export const defaults: Config & { client?: Client } = {
    urls: [],
    lock: false,
    previous: {},
    channelMap: {},
}