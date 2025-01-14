import type { Ability } from "./Ability";
import { Item } from "./Item";

export class AbilityManager<T extends Instance = Instance> {
    constructor(public item: Item<T>) {
        
    }

    callAbilityEvent(event: string, ...params: unknown[]) {
        for(const ability of this.abilities) {
            if(event in ability) {
                const _ability = ability as unknown as Map<string, (...params: unknown[]) => {}>
                _ability.get(event)!(_ability, ...params)
            }
        }
    }

    abilities: Ability<Item>[] = [];

    add(clazz: Ability<Item>) {
        this.abilities.push(clazz)
    }
}