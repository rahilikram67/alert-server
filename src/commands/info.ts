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
                    { name: "See Configutaion", value: "```!view```" },
                    { name: "Url calls delay time", value: "```!interval [number]<min,sec,hr,day,week> (can be repeated by space)```" },
                    { name: "Status of most recent url calls", value: "```!status```" },
                    { name: "Set Channel by name of Market ", value: "```!set [channel]=<hibbett,jdsports,finishline> (can be repeated by space)```" },
                    { name: "Reset Configuration", value: "```!reset```" },
                    { name: "Information about Commands", value: "```!info```" }
                ])
        ]
    })
}