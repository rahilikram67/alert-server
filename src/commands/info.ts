import { EmbedBuilder, Message } from "discord.js";
import { messageSendError } from "../utils/errors";

export function info(message: Message, config: Config) {
    message.channel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle("Available Commands")
                .setAuthor({ name: "Monitor" })
                .addFields([
                    { name: "Add Url", value: "```!add [url]```" },
                    { name: "Remove Url", value: "```!del [url]```" },
                    { name: "See Configuration", value: "```!view```" },
                    { name: "Status of most recent url calls", value: "```!status```" },
                    { name: "Set channel to store monitor ", value: "```!set channelID=<hibbett,jdsports,finishline> (can be repeated by space)```" },
                    { name: "Reset Configuration", value: "```!reset```" },
                    { name: "Information about Commands", value: "```!info```" }
                ])
        ]
    }).catch(err=>messageSendError(message))
}