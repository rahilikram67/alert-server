import { Message } from "discord.js";
import { clone } from "lodash";
import { defaults } from "../utils/defaults";
import { reply } from "../utils/func";

export function reset(message:Message,config:Config){
    Object.assign(config,clone(defaults))
    reply(message,"Reset to default values")
}