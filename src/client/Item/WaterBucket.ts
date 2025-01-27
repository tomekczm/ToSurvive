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

    getCapacity() {
        return this.item.GetAttribute("Capacity") as number ?? 0
    }

    getMaxCapacity() {
        return this.item.GetAttribute("MaxCapacity") as number ?? 5
    }

    getDescription(): string {
        const capacity = this.getCapacity()
        const maxCapacity = this.getMaxCapacity()
        const roundedUpCapacity = tostring(math.floor(capacity * 10) / 10)
        const procentage = tostring(math.floor((capacity / maxCapacity) * 1000) / 10)

        return `The most basic water stoarge item\n${roundedUpCapacity}/${maxCapacity}L (${procentage}%)`
    }

    getExtendedDescription(): string {
        return `${this.getDescription()}\n\n` +
                `<b>Fillup speed: 0.1L/S</b>\n\n` + // random number i made up
                `${this.createHintText("Place it during the rain for it to fill up")}` 
    }
}