import { ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { SwingFight } from "server/ItemAbilities/SwingFight";

type Constraint = ReplicatedStorage["Tools"]["Sword"]
export class SwordItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Sword.Clone())
        this.abilityManager.add(new SwingFight(this))
    }
}