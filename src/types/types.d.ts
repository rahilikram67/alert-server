

interface Config {
    urls: string[]
    delay: number
    lock: boolean
    previous: ItemObject
}

interface Market {
    [key: string]: string
}

interface Item {
    image: string
    text: string
    market: string
    color: string
    size: string,
    stock: string
    price: string
}

interface ItemObject {
    [key: string]: Item
}

