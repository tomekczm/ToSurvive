import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "shared/Ability";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { placeAndConnect } from "server/ItemAbilities/PlaceConnective";

type WaterBucket = ReplicatedStorage["Builds"]["Wooden Water Bucket"]

class WoodenWaterBucketAbility extends Ability<WoodenWaterBucket> {
    constructor(item: WoodenWaterBucket, prefab: WaterBucket) {
        super(item);
        item.listenToEvent("Build", (target) => {
           this.item.setQuantity(this.item.getQuantity() - 1)
           const clone = prefab.Clone()
           clone.SetAttribute("Capacity", this.item.getCapacity())
           placeAndConnect(target, clone)
           clone.RootPart.PickUp.Enabled = true

           registerCollectableItem(clone, () => {
                const capacity = clone.GetAttribute("Capacity") as number ?? 0
                const waterBucket = new WoodenWaterBucket()
                waterBucket.setCapacity(capacity)
                return waterBucket;
           })
        })
    }
}

type Constraint = ReplicatedStorage["Tools"]["Wooden Water Bucket"]
export class WoodenWaterBucket extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Water Bucket"].Clone())
        this.abilityManager.add(new WoodenWaterBucketAbility(this, ReplicatedStorage.Builds["Wooden Water Bucket"]))
    }

    setCapacity(number: number) {
        this.item.SetAttribute("Capacity", number)
    }

    getCapacity() {
        return this.item.GetAttribute("Capacity") as number ?? 0
    }
}