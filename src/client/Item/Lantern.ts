import { RotateAbility } from "client/ItemAbility/RotateAbility"
import { ClientItem } from "./ClientItem"
import { PointAtAbility } from "client/ItemAbility/PointAtAbility"

type Constraint = ReplicatedStorage["Tools"]["Lantern"]
export class LanternItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
    }
}