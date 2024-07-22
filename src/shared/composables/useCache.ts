export function getCachedData(key: string): any {
    const cached = localStorage.getItem(key)
    if (cached) {
        const { data, timestamp, ttl } = JSON.parse(cached)
        if (new Date().getTime() < timestamp + ttl) {
            return data
        } else {
            localStorage.removeItem(key)
        }
    }
    return null
}

export function setCachedData(key: string, data: any, ttl: number = 3600000): void {
    const timestamp = new Date().getTime()
    localStorage.setItem(key, JSON.stringify({ data, timestamp, ttl }))
}

export function clearCachedData(key: string): void {
    localStorage.removeItem(key)
}
