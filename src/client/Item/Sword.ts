import { Players, ServerStorage } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";

type Constraint = ServerStorage["Tools"]["Sword"]
export class SwordItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this))

        //Players.LocalPlayer.GetMouse().Button1Down.Connect(() => {
        //        this.invokeEvent("Swing")
        //})
    }
}