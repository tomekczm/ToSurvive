import { Players, ServerStorage } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { SwingAbility } from "client/ItemAbility/SwingAbility";
import { MeleeSwing } from "client/ItemAbility/MeleeSwing";

type Constraint = ReplicatedStorage["Tools"]["Sword"]
export class SwordItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
        this.abilityManager.add(new MeleeSwing(this));
        //Players.LocalPlayer.GetMouse().Button1Down.Connect(() => {
        //        this.invokeEvent("Swing")
        //})
    }
}