import { Message } from "discord.js";
import { defaults } from "../utils/defaults";
import { reply } from "../utils/func";
import { db } from "../utils/stormDb";



export function reset(message: Message, config: Config) {
    Object.assign(config, { ...defaults, _403: null })
    db.set("setting", defaults).save()
    reply(message, "Reset to default values")
}