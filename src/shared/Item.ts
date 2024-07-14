import { AbilityManager } from "./AbilityManager";

export class Item<T extends Instance = Instance> {
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

    getName(): string {
        return (this.item.GetAttribute("Name") || this.item.Name) as string
    }

    isStackable() {
        return (this.item.GetAttribute("Stackable") ?? true) as boolean
    }

    getDescription(): string {
        return (this.item.GetAttribute("Description") || "No description found.") as string
    }

    getThumbnail(): string {
        return (this.item.GetAttribute("Image")) as string
    }

    getQuantity(): number {
        return (this.item.GetAttribute("Quantity") ?? 1) as number
    }
    

    /*
    abstract equip(): void
    abstract preEquip(): void

    abstract preUneqip(): void
    abstract unequip(): void
    */
}