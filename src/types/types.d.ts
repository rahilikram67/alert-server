interface Config {
    urls: string[]
    delay: number
    lock: boolean
    previous: ItemObject
    timer?:NodeJS.Timer
    channelMap:Market
}
interface Market {
    [key: string]: string
}

interface Item {
    image: string
    text: string
    market: string
    color: string
    size: string
    stock: string
    price: string
    time?:number
}

interface ItemObject {
    [key: string]: Item
}

