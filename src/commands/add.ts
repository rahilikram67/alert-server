import axios from "axios"
import { EmbedBuilder, Message } from "discord.js"
import * as cheerio from 'cheerio';
import { compact, uniq } from "lodash"
import * as blue from "bluebird"

export async function add(message: Message, config: Config) {
    const matches = message.content.split(" ")
    
    matches.shift()
    
    const arr_len = matches.length
    if (arr_len && arr_len > 1) return message.reply({
        content: "Commands are incorrect"
    }).then(res => setTimeout(() => res.delete(), 2000))
    config.urls.push(matches[0])
    config.urls = uniq(config.urls)
    message.reply({
        content: `url ${matches[0]} has been added`
    }).then(res => setTimeout(() => res.delete(), 2000))
    
}




function embedder() {

    return new EmbedBuilder()
    // .setColor(0x0099FF)
    // .setAuthor({ name: "Sales Bot", iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zMtEgd5Lava93Sl4SEEiST2GB-L5DdElsg&usqp=CAU" })
    // .setColor(0x0099FF)
    // .setTitle('Sales Price Analytics')
    // .setImage("https://png.pngitem.com/pimgs/s/71-710469_graph-png-download-image-business-growth-graph-transparent.png")
    // .setTimestamp()
    // .setDescription(`Bots calculations on prices `)
    // .addFields([
    //     { name: "Command", value: format(args.command), inline: true },
    //     { name: "Search", value: format(args.search), inline: true },
    //     { name: "Average", value: format(`$${average}`), inline: true },
    //     { name: "Low", value: format(`$${low}`), inline: true },
    //     { name: "High", value: format(`$${high}`), inline: true },
    //     { name: "Estimated Profit", value: format(`$${profit}`), inline: true },
    //     { name: "Search info:", value: "\u200b" },
    //     { name: "Number of results", value: format(total_prices), inline: true },
    //     { name: "Total Sales", value: format(`$${sum}`), inline: true },
    //     { name: "Page Limit", value: format(Number(args._page_len) || 0), inline: true },
    //     { name: "Pages Indexed", value: format(total_pages), inline: true },
    // ])
}

function format(s: string | number | undefined) {
    return `\`\`\`${s}\`\`\``
}