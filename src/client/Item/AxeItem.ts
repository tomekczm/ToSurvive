import { Players, ServerStorage } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { SwingAbility } from "client/ItemAbility/SwingAbility";

type Constraint = ReplicatedStorage["Tools"]["Hammer"]
export class AxeItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new SwingAbility(this))
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
    }
}