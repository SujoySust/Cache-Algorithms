/**
 * Write-around cache
 * 
 * This technique is similar to write-through cache, but data is written directly to permanent storage,
 * bypassing the cache. This can reduce the cache being flooded with write operations that will not
 * subsequently be re-read, but has the disadvantage that a read request for recently written data 
 * will create a “cache miss” and must be read from slower back-end storage and experience higher latency
 */

class WriteArroundCache<T>{
    private cache: Map<string, T>;
    private underlyingStorage: Map<string, T>;

    constructor() {
        this.cache = new Map();
        this.underlyingStorage = new Map();
    }

    get(key: string): T | undefined {
        if (this.cache.has(key)) {
            console.log("Data found in cache");
            return this.cache.get(key);
        } else {
            console.log('Data not found in cache. Fetching from storage');
            const data = this.underlyingStorage.get(key)
            if (data) {
                this.cache.set(key, data);
            }
            return data;
        }
    }

    // Write data only to underlying storage
    set(key: string, value: T): void {
        // Write to underlying storage
        console.log(`Writing ${key}: ${value} to storage`);
        this.underlyingStorage.set(key, value);

        // Remove from cache to prevent stale data
        if(this.cache.has(key)) {
            this.cache.delete(key);
        }
    }
}

{{
    const cache = new WriteArroundCache();
    cache.set('key1', 'value1');
    console.log(cache.get('key1'));
}}