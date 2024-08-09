import { ProximityPromptService, ReplicatedStorage } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";

type Constraint = ReplicatedStorage["Tools"]["Flint"]
export class FlintItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Flint.Clone())
    }
}