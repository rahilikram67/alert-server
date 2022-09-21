import { Client, GatewayIntentBits, Message } from "discord.js"

import { add } from "./commands/add"
import { del } from "./commands/del"
import { view } from "./commands/view"
import { interval } from "./commands/interval"
import { available } from "./event/available"
import { status } from "./commands/status"
import { set } from "./commands/set"


import { clone, random } from "lodash"
import { defaults } from "./utils/defaults"
import { reset } from "./commands/reset"
import { info } from "./commands/info"
import { db } from "./utils/stormDb"


export const discordServer = () => {
    const config: Config & { client: Client } = clone(db.get("setting").value())
    config.client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    })
    const cmds: { [key: string]: (message: Message, config: Config) => void } = {
        "add": add,
        "del": del,
        "view": view,
        "interval": interval,
        "status": status,
        "set": set,
        "reset": reset,
        "info": info
    }



    config.client.on("messageCreate", async (message) => {
        const cmd = message.content.split(" ")[0].slice(1)
        if (!cmds[cmd]) return
        else cmds[cmd](message, config)
    })



    config.client.on("ready", () => {
        console.log("Bot is ready!")
        repeater(config)
    })
    config.client.login(process.env.TOKEN)
}

export function repeater(config: Config & { client: Client }) {

    new Promise(resolve => {
        var rand = random(5, 20, false) * 1000;
        setTimeout(() => available(config).then(() => {
            db.set("setting.previous", config.previous).save()
            resolve(null)
        }), config.delay + rand)
    }).then(() => {
        repeater(config)
    })
}



