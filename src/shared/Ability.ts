import { AbilityManager } from "shared/AbilityManager";
import { Item } from "shared/Item";

export class Ability<T extends Item> {
    item: T;
    constructor(item: T) {
        this.item = item
        task.defer(() => {
            this.onStart()
        })
    }

    onStart() {}
}