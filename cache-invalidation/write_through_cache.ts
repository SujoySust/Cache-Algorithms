/**
 * Write-through cache
 * 
 * Under this scheme, data is written into the cache and the corresponding database simultaneously.
 * 
 * The cached data allows for fast retrieval and, since the same data gets written in the permanent storage,
 * we will have complete data consistency between the cache and the storage. Also,
 * this scheme ensures that nothing will get lost in case of a crash, power failure, or other system disruptions.
 * 
 * Although, write-through minimizes the risk of data loss, since every write operation must be done twice before
 * returning success to the client, this scheme has the disadvantage of higher latency for write operations.
 */

class WriteThroughCache<T> {
    private cache: Map<string, T>;

    constructor() {
        this.cache = new Map();
    }

    // Get data from cache
    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    set(key:string, value: T): void {
        this.cache.set(key, value);
        this.writeToStorage(key, value);
    }

    private writeToStorage(key: string, value: T) {
        console.log(`Writing ${key}: ${value} to storage`);
    }
}

{{
    const cache = new WriteThroughCache();
    cache.set("key1", 'value1');
    console.log(cache.get("key1")); 
}}