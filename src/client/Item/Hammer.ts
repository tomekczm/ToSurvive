import { Players, ServerStorage } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { Ability } from "shared/Ability";

type Constraint = ServerStorage["Tools"]["Hammer"]

const buldGui = Players.LocalPlayer.WaitForChild("PlayerGui")
                                    .WaitForChild("BuildGui")
                                    .WaitForChild("Background") as Frame

class HammerAbility extends Ability<HammerItem> {
    constructor(hammer: HammerItem) {
        super(hammer)
        hammer.equipEvent.Connect(() => {
            buldGui.Visible = true
        })
        hammer.unequipEvent.Connect(() => {
            buldGui.Visible = false
        })
    }
}

export class HammerItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new HammerAbility(this))
    }
}