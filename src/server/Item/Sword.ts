import { ServerStorage } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "../ItemAbilities/Swing";

type Constraint = ServerStorage["Tools"]["Sword"]
export class SwordItem extends ServerItem<Constraint> {
    constructor() {
        super(ServerStorage.Tools.Sword.Clone())
        this.abilityManager.add(new SwingAbility(this))
    }
}