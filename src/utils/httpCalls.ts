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
    headers["user-agent"] = sample(agents) || ""
    await new Promise(resolve => setTimeout(resolve, random(1, 4) * 1000))
    return await axios.get(url, { headers }).catch(err => printErr(err, config))

}