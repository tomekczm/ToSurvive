import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { CraftAndBuildAbility } from "client/ItemAbility/CraftAndBuildAbility";
import { SelfBuildAbility } from "client/ItemAbility/SelfBuildAbility";
import { ReplicatedStorage } from "@rbxts/services";


export class WoodenWaterBucket extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new SelfBuildAbility(this, ReplicatedStorage.Builds["Wooden Water Bucket"]))
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
    }

    getFullness() {
        return (this.item.GetAttribute("Fullness") ?? 0) as number
    }

    getDescription(): string {
        return "Place the bucket to fill it up" + "\n"
                + this.getFullness() + "%"
    }
}