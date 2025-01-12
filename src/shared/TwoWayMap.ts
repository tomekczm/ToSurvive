export class TwoWayMap<T, E> {
    forwardMap = new Map<T, E>();
    backwardsMap = new Map<E, T>();

    get(item: T) {
        return this.forwardMap.get(item);
    }

    getBackwards(item: E) {
        return this.backwardsMap.get(item);
    }

    delete(key: T) {
        const got = this.forwardMap.get(key);
        this.forwardMap.delete(key);
        if(got) this.backwardsMap.delete(got);
    }

    set(key: T, value: E) {
        this.forwardMap.set(key, value);
        this.backwardsMap.set(value, key);
    }
}