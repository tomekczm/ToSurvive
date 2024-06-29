import { Signal } from "@rbxts/beacon"
import { Item } from "shared/Item"

export class ClientItem<T extends Instance = Instance> extends Item<T> {
    equipEvent = new Signal();
    unequipEvent = new Signal();

    constructor(item: Instance) {
        super(item as T)
    }

    equip() {
        this.equipEvent.Fire(undefined)
    }

    unequip() {
        this.unequipEvent.Fire(undefined)
    }

    invokeEvent(name: string, ...args: unknown[]) {
        const event = this.fetchEvent(name)
        event.FireServer(...args)
    }

    listenToEvent(name: string, cb: (...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnClientEvent.Connect((...args: unknown[]) => cb(...args))
    }

    getName(): string {
        return (this.item.GetAttribute("Name") || this.item.Name) as string
    }

    getDescription(): string {
        return (this.item.GetAttribute("Description") || "No description found.") as string
    }

    getThumbnail(): string {
        return (this.item.GetAttribute("Image")) as string
    }
}