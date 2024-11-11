import { AbilityManager } from "./AbilityManager";

export class Item<T extends Instance = Instance> {
    item: T;
    abilityManager = new AbilityManager<T>(this)
    selfAttachment?: Attachment;

    constructor(item: T) {
        this.selfAttachment = item.FindFirstChild("RootPart")?.FindFirstChild("Attachment") as Attachment
        this.item = item
    }

    fetchEvent(name: string) {
        const events = this.item.FindFirstChild("Events")
        assert(events, "Expected an events folder")
        const event = events.FindFirstChild(name) as RemoteEvent
        assert(event, `event ${name} not found`)
        return event
    }

    getAttribute<T>(name: string, _default?: T) {
        return (this.item.GetAttribute(name) ?? _default) as T
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
        return (this.item.GetAttribute("Image")) as string ?? "http://www.roblox.com/asset/?id=15311273253"
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