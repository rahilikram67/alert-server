import { Client, DMChannel, EmbedBuilder } from "discord.js";

import * as cheerio from "cheerio";
import { groupBy, isEmpty, omit, remove } from "lodash";
import { messageSendError } from "../utils/errors";
import { hibHttp, jfinHttp } from "../utils/httpCalls";
export async function available(config: Config & { client: Client }) {
    if (config.lock || !config.urls.length || isEmpty(config.channelMap)) return

    //api call with no concurrency amd message sending concurrency

    const embeds: EmbedBuilder[] = []

    for (const url of config.urls) {
        const job = url.includes("hibbett.com") ? await hibHttp(url, config) : await jfinHttp(url, config)
        if (!job) continue
        const { data } = job as any
        if (config._403 && config._403.includes(url)) remove(config._403, u => u == url)
        let p = url.includes("hibbett.com") ? hibbett(data) : jdFinish(data, url)
        if (!p) return config.previous[url] = null as any
        else if (!config.previous[url]) {
            const { image, market, text } = p
            const rest = omit(p, ["image", "market", "text", "time"])
            let fields = Object.entries(rest).map(e => ({ name: e[0], value: e[1], inline: true }))
            embeds.push(
                new EmbedBuilder()
                    .setTitle(text)
                    .setAuthor({ name: market })
                    .setThumbnail(image)
                    .setURL(url)
                    .setTimestamp()
                    .setFields(fields)
            )
        }
        p.time = Date.now()
        config.previous[url] = p
    }
    const channel_embeds = groupBy(embeds, e => e.data.author?.name)
    for (const c of Object.entries(config.channelMap)) {  // c[0] is channelid & c[1] is market 
        const channel: DMChannel | undefined = config.client.channels.cache.get(c[0]) as any
        if (channel && channel_embeds[c[1]]) await channel.send({ embeds: channel_embeds[c[1]] }).catch(err => messageSendError({ channel } as any))
    }
    config.lock = false
}

function hibbett(data: string): Item | null {
    const $ = cheerio.load(data)
    let avail = $(".all-variants-out-of-stock")
    let btn = $("#add-to-cart")
    if (avail.length || !btn.length) return null
    const img = $("#pdpMain > .product-col-1 > .product-image-wrapper > div > link")
    const text = $("#pdpMain > .product-detail > h1")
    const price = $(".price-sales")[0]
    const color = $(".current-value")
    const size = $(".value .selectable.size").text().match(/\d+(\.\d+)?/g)
    return {
        image: $(img).attr("href") || "",
        text: $(text).text(),
        market: "hibbett",
        price: "$" + String(Number($(price).text()) || 0),
        color: $(color).text() || "\u200b",
        stock: "\u200b",
        size: size?.length ? size.join(",") : "\u200b"
    }
}

function jdFinish(data: string, url: string): Item | null {
    const $ = cheerio.load(data)
    let avail = $("#buttonAddToCart")
    if (!avail.length) {return null}
    const img = $("#thumbSlides > div:nth-child(1) > div")
    const text = $(".product-detail-container > .hmt-3 > div:nth-child(1) > .row.column > h1")
    const market = url.includes("jdsports.com") ? "jdsports" : "finishline"
    let price = $(".productPrice .fullPrice")
    if (!price.length) price = $(".productPrice .nowPrice")
    const color = $("#styleColors")
    const size = $(".productSizeOptions .expanded")
    const stock = $("#skuStockLevel").attr("value")
    return {
        image: $(img).attr("data-large") || "\u200b",
        text: $(text).text() || "\u200b",
        market,
        price: "$" + String(price.length ? Number($(price[0]).text().slice(1)) : 0),
        color: $(color).text().trim(),
        stock: stock || "\u200b",
        size: size.length ? $(size).text().match(/\d+(\.\d+)?/g)?.join(", ") || "\u200b" : "\u200b"
    }
}


// https://www.hibbett.com/jordan-9-retro-black-gum-light-brown-mens-boot/5P702.html?dwvar_5P702_color=0056&cgid=men-shoes-basketballshoes#start=1&sz=24
