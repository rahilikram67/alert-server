import { EmbedBuilder, Message } from "discord.js"
import humanizeDuration from "humanize-duration"


export async function view(message: Message, config: Config) {
    const { urls } = config
    message.channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: "Alert Bot", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                .setTitle('Alert Bot Config')
                .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                .setTimestamp()
                .setDescription(`Urls and interval for alert Bot`)
                .addFields([{ name: "Urls:", value: urls.length ? urls.join("\n\n") : "\u200b" }])
                .addFields([{ name: "Interval:", value: `\`\`\`${humanizeDuration(config.delay)}\`\`\`` }])
        ]
    })
}

