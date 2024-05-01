/**
 * Write-back cache
 * 
 * Under this scheme, data is written to cache alone, and completion is immediately confirmed to the client.
 * The write to the permanent storage is done based on certain conditions, for example,
 * when the system needs some free space. This results in low-latency and high-throughput 
 * for write-intensive applications; however, this speed comes with the risk of data loss
 * in case of a crash or other adverse event because the only copy of the written data is in the cache.
 */

interface CacheItem<T> {
    key: string;
    value: T;
    dirty: boolean;
}

class WriteBackCache<T> {
    private cache: Map<string, CacheItem<T>>;
    private underlyingStorage: Map<string, T>;

    constructor() {
        this.cache = new Map();
        this.underlyingStorage = new Map();
    }

    get (key: string): T | undefined {
        if (this.cache.has(key)) {
            console.log("Data found in cache");
            return this.cache.get(key)?.value;
        } else {
            console.log("Data not found in cache. Fetching from storage");
            const data = this.underlyingStorage.get(key);
            if (data) {
                this.cache.set(key, {key: key, value: data, dirty: false});
            }
            return data;
        }
    }

    set(key: string, value: T): void {
        console.log(`Writing ${key}: ${value} to cache (write-back)`);
        if (this.cache.has(key)) {
            const item = this.cache.get(key)!;
            item.value = value;
            item.dirty = true;
            this.cache.set(key, item);
        } else {
            this.cache.set(key, {key: key, value: value, dirty: true});
        }
    }

    flushToStorage(): void {
        console.log("Flushing dirty data back to storage");
        this.cache.forEach((item, key)=> {
            if(item.dirty) {
                console.log(`Writing ${key}: ${item.value} to storage`);
                this.underlyingStorage.set(key, item.value);
                item.dirty = false;
                this.cache.set(key, item);
            }
        })
    }
 }

 {{
    // Example usage
    const cache = new WriteBackCache();

    // Writing data to cache (without immediately writing to storage)
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    // Reading data from cache
    console.log(cache.get("key1")); // Output: value1
    console.log(cache.get("key2")); // Output: value2

    // Flushing dirty data back to storage
    cache.flushToStorage();
 }}