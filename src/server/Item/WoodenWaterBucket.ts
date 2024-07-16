import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "shared/Ability";

class WoodenWaterBucketAbility extends Ability<WoodenWaterBucket> {
    constructor(item: WoodenWaterBucket, prefab: Model) {
        super(item);
        item.listenToEvent("Build", (cframe) => {
           this.item.setQuantity(this.item.getQuantity() - 1)
           const clone = prefab.Clone()
           clone.Parent = Workspace
           clone.PivotTo(cframe as CFrame)
        })
    }
}

type Constraint = ReplicatedStorage["Tools"]["Wooden Water Bucket"]
export class WoodenWaterBucket extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Water Bucket"].Clone())
        this.abilityManager.add(new WoodenWaterBucketAbility(this, ReplicatedStorage.Builds["Wooden Water Bucket"]))
    }
}