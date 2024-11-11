import { Signal } from "@rbxts/beacon"
import { Item } from "shared/Item"

export class ClientItem<T extends Instance = Instance> extends Item<T> {
    equipEvent = new Signal();
    unequipEvent = new Signal();

    constructor(item: Instance) {
        super(item as T);
    }

    equip() {
        this.equipEvent.Fire(undefined)
        this.abilityManager.callAbilityEvent("onEquip");
    }

    unequip() {
        this.unequipEvent.Fire(undefined)
        this.abilityManager.callAbilityEvent("onUnequip");
    }

    getPosition() {
        if(this.selfAttachment === undefined) {
            throw error("Attachment not found")
        }
        return this.selfAttachment.WorldPosition;
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