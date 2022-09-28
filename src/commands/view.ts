import { EmbedBuilder, Message } from "discord.js"
import { chunk, isEmpty } from "lodash"
import { messageSendError } from "../utils/errors"


export async function view(message: Message, config: Config) {
    const { urls, _403, channelMap } = config


    if (urls && urls.length) {
        const embeds: EmbedBuilder[] = []
        for (let url of chunk(urls,20)) {
            embeds.push(
                new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: "Urls", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                    .setTitle('Alert Bot Config')
                    .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                    .setTimestamp()
                    .setDescription(`${url?.length ? url.join("\n\n") : "\u200b"}`)
            )

        }
        message.channel.send({ embeds }).catch(err => messageSendError(message))
    }

    !isEmpty(channelMap) && message.channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: "Notification Location", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                .setTitle('Alert Bot Config')
                .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                .setTimestamp()
                .setDescription(`
                  ${Object.entries(channelMap).map(e => `${e[0]}: ${e[1]}`).join("\n")}
                `)
        ]
    }).catch(err => messageSendError(message))

    _403 && _403.length && message.channel.send({
        embeds: [
            new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: "Rejected Urls by Server", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
                .setTitle('Alert Bot Config')
                .setImage("https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-alert-icon-12.jpg")
                .setTimestamp()
                .setDescription(`
                  ${_403.join("\n\n")}
                `)
        ]
    }).catch(err => messageSendError(message))

    if (!_403 && isEmpty(channelMap) && urls && urls.length) message.channel.send("No Entries")
}

