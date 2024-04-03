import { ReplicatedStorage } from "@rbxts/services";
import { SwordItem } from "./Sword";

const asMap = new Map<string, (item: Instance) => void>();

export function registerItem(name: string, cb: (item: Instance) => void) {
    asMap.set(name, cb)
}

registerItem("Sword", (sword) => { new SwordItem(sword) })

ReplicatedStorage.Events.CreateItem.OnClientEvent.Connect((name, instance) => {
    const caller = asMap.get(name)
    if(caller) {
        caller(instance)
    }
})