import { PointAtAbility } from "client/ItemAbility/PointAtAbility"
import { ClientItem } from "./ClientItem"
import { RotateAbility } from "client/ItemAbility/RotateAbility"
import { ThrowAbility } from "client/ItemAbility/ThrowAbility"
import { MeleeSwing } from "client/ItemAbility/MeleeSwing"

type Constraint = ReplicatedStorage["Tools"]["Spear"]
export class SpearItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
        this.abilityManager.add(new ThrowAbility(this))
        this.abilityManager.add(new MeleeSwing(this));
    }
}