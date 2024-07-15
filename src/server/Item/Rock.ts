import { ReplicatedStorage } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";

type Constraint = ReplicatedStorage["Tools"]["Rock"]
export class RockItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Rock.Clone())
        this.abilityManager.add(new CollectAbility(this));
    }
}