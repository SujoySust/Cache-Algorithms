/**
 * Least Frequently Used (LFU)
 *
 * LFU is a cache replacement policy that removes the least frequently used item from the cache when it becomes full.
 * This policy assumes that items that have been accessed more frequently are more likely to be accessed again in the future.
 */

class LFUCache<T> {
    private capacity: number;
    private cache: Map<string, {value: T, frequency: number}>;
    private frequencies: Map<number, Set<string>>;
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.frequencies = new Map();
    }

    get(key: string): T | undefined {
        if (this.cache.has(key)) {
            const entry = this.cache.get(key)!;
            // Increment frequency
            this.incrementFrequency(key);
            return entry.value;
        }
        return undefined;
    }

    put(key: string, value: T): void {
        if (this.capacity === 0) return;

        if(this.cache.has(key)) {
            const existingEntry = this.cache.get(key)!;
            existingEntry.value = value;
            this.incrementFrequency(key);
        } else {
            if (this.cache.size == this.capacity) {
                const minFreq = Math.min(...Array.from(this.frequencies.keys()));
                const lfuSet = this.frequencies.get(minFreq)!;
                const evictKey = lfuSet.values().next().value;
                lfuSet.delete(evictKey);
                this.cache.delete(evictKey);
            }
        }

        this.cache.set(key, {value, frequency: 1});
        if (!this.frequencies.has(1)) {
            this.frequencies.set(1, new Set());
        }
        this.frequencies.get(1)!.add(key);
    }

    private incrementFrequency(key: string): void {
        const entry = this.cache.get(key)!;
        const prevFreq = entry?.frequency ?? 0;
        const newFreq = prevFreq + 1;

        // Update frequency in cache entry
        entry.frequency = newFreq;

        // Remove from previous frequency set
        const prevFreqSet = this.frequencies.get(prevFreq)!;
        prevFreqSet.delete(key);

        if(prevFreqSet.size == 0) {
            this.frequencies.delete(prevFreq);
        }

        // Add to new frequency set
        if (!this.frequencies.has(newFreq)) {
            this.frequencies.set(newFreq,new Set());
        }
        this.frequencies.get(newFreq)!.add(key);
    }
}

{{
    const cache = new LFUCache<number>(2);
    cache.put("a", 1);
    cache.put("b", 2);
    console.log(cache.get("a")); // Output: 1
    cache.put("c", 3);
    console.log(cache.get("b")); // Output: undefined (b was removed due to LFU policy)
}}