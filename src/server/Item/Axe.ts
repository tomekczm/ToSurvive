import { CollectionService, Players, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "server/ItemAbilities/Swing";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { SwordItem } from "./Sword";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";

type Constraint = ReplicatedStorage["Tools"]["Axe"]
export class AxeItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Axe.Clone())
        this.abilityManager.add(new CollectAbility(this));
    }
}