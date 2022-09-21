import { EmbedBuilder, Message } from "discord.js";

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
                    { name: "Url calls delay time", value: "```!interval [number]<min,sec,hr,day,week> (can be repeated by space)```" },
                    { name: "Status of most recent url calls", value: "```!status```" },
                    { name: "Set channel to store monitor ", value: "```!set <hibbett,jdsports,finishline>=[channel] (can be repeated by space)```" },
                    { name: "Reset Configuration", value: "```!reset```" },
                    { name: "Information about Commands", value: "```!info```" }
                ])
        ]
    })
}