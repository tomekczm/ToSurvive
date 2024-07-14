import { ReplicatedStorage } from "@rbxts/services";
import { SwordItem } from "./Sword";
import { Item } from "shared/Item";
import { ClientItem } from "./ClientItem";
import { HammerItem } from "./Hammer";
import { AxeItem } from "./AxeItem";

const asMap = new Map<string, (item: Instance) => ClientItem>();
const toolMap = new Map<Instance, ClientItem>()

export function getItemFromInstance(instance: Instance) {
    return toolMap.get(instance)
}

export function registerItem(name: string, cb: (item: Instance) => ClientItem) {
    asMap.set(name, cb)
}

registerItem("Sword", (sword) => new SwordItem(sword))
registerItem("Hammer", (hammer) => new HammerItem(hammer))
registerItem("Axe", (hammer) => new AxeItem(hammer))

ReplicatedStorage.Events.CreateItem.OnClientEvent.Connect((name, instance) => {
    const caller = asMap.get(name)
    if(caller) {
        toolMap.set(
            instance,
            caller(instance)
        )
    }
})