import { Client } from "discord.js";
import discord from "discord.js"
export const defaults:Config&{client:Client}={
    delay: 10000,
    urls: [],
    lock: false,
    client: new discord.Client({
        intents: [
            discord.GatewayIntentBits.Guilds,
            discord.GatewayIntentBits.GuildMessages,
            discord.GatewayIntentBits.MessageContent
        ],
    }),
    previous: {},
    channelMap: {}
}