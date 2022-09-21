import { Client, DMChannel, EmbedBuilder } from "discord.js";
import axios, { AxiosError } from "axios";
import * as blue from "bluebird"
import * as cheerio from "cheerio";
import { isEmpty, omit, sample } from "lodash";
export async function available(config: Config & { client: Client }) {
    if (config.lock) return console.log("process is locked")
    else if (!config.urls.length || isEmpty(config.channelMap)) return
    config.lock = true

    const user_agnt = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/105.0.5195.129 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; SM-N960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; LM-X420) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    ]
    const api_arr = config.urls.map(e => {
        return (e.includes("hibbett.com")) ? axios.get(e, {
            headers: {
                "User-Agent": sample(user_agnt) || ""
            }
        }).catch(printErr) : axios.get(e).catch(printErr)
    })
    //api call concurrency amd message sending concurrency
    await blue.Promise.map(api_arr, (job: any) => {
        if (!job) return
        const { config: { url }, data } = job
        let p = url.includes("hibbett.com") ? hibbett(data) : jdFinish(data, url)
        if (!p || !config.channelMap[p.market]) return config.previous[url] = null as any
        else if (!config.previous[url]) {
            const { image, market, text } = p
            const rest = omit(p, ["image", "market", "text", "time"])
            let fields = Object.entries(rest).map(e => ({ name: e[0], value: e[1], inline: true }))
            const channel: DMChannel = config.client.channels.cache.find((c: any) => c.name == config.channelMap[market]) as any
            if (!channel) return
            channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(text)
                        .setAuthor({ name: market })
                        .setThumbnail(image)
                        .setURL(url)
                        .setTimestamp()
                        .setFields(fields)
                ]
            }).catch(err => { })
        }
        p.time = Date.now()
        config.previous[url] = p
    }, { concurrency: 100 })



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
    if (!avail.length) return null
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

function printErr(e: AxiosError) {
    console.error(e.response?.config.url, " failed status:" + e.status)
}
