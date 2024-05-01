/**
 * Random Replacement
 * 
 * Random replacement is a cache replacement policy that removes a random item from the cache when it becomes full.
 * This policy doesn’t make any assumptions about the likelihood of future access and can be useful 
 * when the access pattern is unpredictable.
 */

class RandomReplacementCache<T> {
    private capacity: number;
    private cache: Map<string, T>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    put(key: string, value: T): void {
        if (this.cache.size == this.capacity) {
            const keys = Array.from(this.cache.keys());
            const randomIndex = Math.floor(Math.random() * keys.length);
            const randomKey = keys[randomIndex];
            this.cache.delete(randomKey);
        }
        this.cache.set(key, value);
    }
}

{{
    const cache = new RandomReplacementCache<number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    console.log(cache.get('a'));
    console.log(cache.get('b'));
    console.log(cache.get('c'));
}}