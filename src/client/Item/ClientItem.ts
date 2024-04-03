import { Item } from "shared/Item"

export class ClientItem<T extends Instance = Instance> extends Item<T> {

    constructor(item: Instance) {
        super(item as T)
    }

    invokeEvent(name: string, ...args: unknown[]) {
        const event = this.fetchEvent(name)
        event.FireServer(...args)
    }

    listenToEvent(name: string, cb: (...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnClientEvent.Connect((...args: unknown[]) => cb(...args))
    }
}