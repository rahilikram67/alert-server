import axios from "axios"
import { HttpsProxyAgent } from "https-proxy-agent"
import { random, sample } from "lodash"
import { printErr } from "./errors"
import headers from "./header.json"
import proxies from "./proxies.json"
import agents from "./agents.json"

export async function hibHttp(url: string, config: Config) {
    headers["user-agent"] = sample(agents) || ""
    const _axios = axios.create({ httpsAgent: new HttpsProxyAgent(sample(proxies) || {}) })
    return _axios.get(url, { headers }).catch((err) => printErr(err, config))
}

export async function jfinHttp(url: string, config: Config) {
    return await new Promise(resolve => {
        setTimeout(() => {
            return resolve(axios.get(url).catch(err => printErr(err, config)))
        }, random(1, 2) * 1000)
    })
}