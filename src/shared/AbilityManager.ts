import { Item } from "./Item";

export class AbilityManager<T extends Instance = Instance> {
    constructor(public item: Item<T>) {
        
    }

    add(clazz: unknown) {}
}