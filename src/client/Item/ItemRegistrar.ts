import { ReplicatedStorage } from "@rbxts/services";
import { SwordItem } from "./Sword";
import { Item } from "shared/Item";
import { ClientItem } from "./ClientItem";
import { HammerItem } from "./Hammer";
import { AxeItem } from "./AxeItem";
import { RockItem } from "./Rock";
import { WoodenWaterBucket } from "./WaterBucket";
import { FlintItem, RawMeatItem, WoodenLogItem } from "./GenericItems";
import { SpearItem } from "./Spear";
import { ShovelItem } from "./Shovel";
import { LanternItem } from "./Lantern";

const asMap = new Map<string, (item: Instance) => ClientItem>();
const toolMap = new Map<Instance, ClientItem>()
const slotMap = new Map<number, Instance>()

export function getItemFromInstance(instance: Instance) {
    return toolMap.get(instance)
}

export function registerItem(name: string, cb: (item: Instance) => ClientItem) {
    asMap.set(name, cb)
}

registerItem("Sword", (sword) => new SwordItem(sword))
registerItem("Hammer", (hammer) => new HammerItem(hammer))
registerItem("Axe", (hammer) => new AxeItem(hammer))
registerItem("Rock", (hammer) => new RockItem(hammer))
registerItem("Wooden Water Bucket", (bucket) => new WoodenWaterBucket(bucket))
registerItem("Meat", (item) => new RawMeatItem(item))
registerItem("Wooden Log", (item) => new WoodenLogItem(item))
registerItem("Flint", (flint) => new FlintItem(flint))
registerItem("Spear", (spear) => new SpearItem(spear))
registerItem("Shovel", (spear) => new ShovelItem(spear))
registerItem("Lantern", (spear) => new LanternItem(spear))

ReplicatedStorage.Events.CreateItem.OnClientEvent.Connect((name, instance) => {
    const caller = asMap.get(name)
    if(caller) {
        toolMap.set(
            instance,
            caller(instance)
        )
    }
})