/**
 * Least Recently Used (LRU)
 * LRU is a cache replacement policy that removes the least recently used item from the cache when it becomes full.
 * This policy assumes that items that have been accessed more recently are more likely to be accessed again in the future.
 */

class LRUCache<T> {
    private capacity: number;
    private cache: Map<string, T>;
    private keys: string[];

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.keys = [];
    }

    get(key: string): T | undefined {
        if (this.cache.has(key)) {
            // Refresh the key by moving it to the end of the list
            this.refreshKey(key);
            return this.cache.get(key);
        }
        return undefined;
    }

    put(key: string, value: T): void {
        // If the cache already contains the key, update its value and refresh the key
        if(this.cache.has(key)) {
            this.cache.set(key, value);
            this.refreshKey(key);
            return;
        }

        // If the cache is at its capacity, remove the least recently used key
        if (this.cache.size == this.capacity) {
            const lruKey = this.keys.shift();
            if (lruKey) {
                this.cache.delete(lruKey);
            }
        }
    
        // Add the new key-value pair to the cache
        this.cache.set(key,value);
        this.keys.push(key);
    }


    private refreshKey(key: string): void {
        // Move the key to the end of the list to indicate it's the most recently used
        const index = this.keys.indexOf(key);
        if(index !== - 1) {
            this.keys.splice(index, 1);
            this.keys.push(key);
        }
    }
}

{{
    const cache = new LRUCache<number>(2);
    cache.put("a",1);
    cache.put("b",2);
    console.log(cache.get('a'));
    cache.put('c',3);
    console.log(cache.get('b'));
}}