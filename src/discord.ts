import discord, { Client, Collection, DMChannel } from "discord.js"

import { add } from "./commands/add"
import { del } from "./commands/del"
import { view } from "./commands/view"
import { interval } from "./commands/interval"
import { available } from "./event/available"
import { random } from "lodash"
import { status } from "./commands/status"

export const discordServer = () => {
    const config: Config & { client: Client } = {
        delay: 3000,
        urls: [],
        lock: false,
        client: new discord.Client({
            intents: [
                discord.GatewayIntentBits.Guilds,
                discord.GatewayIntentBits.GuildMessages,
                discord.GatewayIntentBits.MessageContent
            ],
        }),
        previous: {}
    }




    config.client.on("messageCreate", async (message) => {
        switch (message.content.split(" ")[0]) {
            case "!add":
                add(message, config)
                break
            case "!del":
                del(message, config)
                break
            case "!view":
                view(message, config)
                break
            case "!interval":
                interval(message, config)
                break
            case "!status":
                status(message, config)
                break
        }
    })

    config.client.on("ready", () => {
        console.log("Bot is ready!")
        repeater(config)
    })

    config.client.login(process.env.TOKEN)

}

export async function repeater(config: Config & { client: Client }) {
    const channels: Collection<string, DMChannel> = config.client.channels.cache.filter((c: any) => !c.type) as any
    var rand = random(5, 20, false) * 1000;
    await new Promise(resolve => {
        setTimeout(async () => {
            await available(channels, config)
            resolve(null)
        }, config.delay + rand)
    })
    repeater(config)
}



