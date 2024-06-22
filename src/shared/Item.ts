import { AbilityManager } from "./AbilityManager";

export abstract class Item<T extends Instance = Instance> {
    item: T;
    abilityManager = new AbilityManager<T>(this)
    constructor(item: T) {
        this.item = item
    }

    fetchEvent(name: string) {
        const events = this.item.FindFirstChild("Events")
        assert(events, "Expected an events folder")
        const event = events.FindFirstChild(name) as RemoteEvent
        assert(event, `event ${name} not found`)
        return event
    }
    

    /*
    abstract equip(): void
    abstract preEquip(): void

    abstract preUneqip(): void
    abstract unequip(): void
    */
}