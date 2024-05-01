/**
 * First In, First Out (FIFO)
 * FIFO is a cache replacement policy that removes the oldest item from the cache when it becomes full. 
 * This policy assumes that the oldest items in the cache are the least likely to be accessed again in the future.
 */
class FIFOCache<T> {
    private capacity: number;
    private cache: Map<string, T>;
    private queue: string[];

    constructor (capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.queue = [];
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    put(key: string, value: T): void {
        if (this.cache.size === this.capacity) {
            const oldestKey = this.queue.shift();
            if(oldestKey) {
                this.cache.delete(oldestKey);
            }
        }

        // Add the new item to the cache and the end of the queue
        this.cache.set(key, value);
        this.queue.push(key);
    }
}

{{
    const cache = new FIFOCache<number>(2);
    cache.put('a',1);
    cache.put('b',2);
    console.log(cache.get('a'));
    cache.put('c', 3);
    console.log(cache.get('b'));
    console.log(cache.get('c'));
    console.log(cache.get('a'));
}}