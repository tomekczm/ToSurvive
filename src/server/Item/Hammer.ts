import { ServerStorage } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "../ItemAbilities/Swing";

type Constraint = ServerStorage["Tools"]["Hammer"]

class HammerAbility extends Ability<HammerItem> {
    constructor(hammer: HammerItem) {
        super(hammer);
        hammer.listenToEvent("Build", (player) => {
            
        })
    }
}

export class HammerItem extends ServerItem<Constraint> {
    constructor() {
        super(ServerStorage.Tools.Hammer.Clone())

        this.abilityManager.add(new HammerAbility(this))
    }
}