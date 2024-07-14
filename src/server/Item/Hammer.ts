import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "../ItemAbilities/Swing";
import { Inventory } from "server/Inventory/Inventory";
import { recipes } from "shared/HammerRecipes";

type Constraint = ReplicatedStorage["Tools"]["Hammer"]

class HammerAbility extends Ability<HammerItem> {
    constructor(hammer: HammerItem) {
        super(hammer);
        hammer.listenToEvent("Build", (_index, cframe) => {
           const owner = hammer.getOwnership()
           assert(owner)
           const index = _index as number
           const recipe = recipes[index - 1]
           if(owner.useRecipe(recipe)) {
            const clone = recipe.result.Clone()
            clone.PivotTo(cframe as CFrame)
            clone.Parent = Workspace
           }
        })
    }
}

export class HammerItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Hammer.Clone())

        this.abilityManager.add(new HammerAbility(this))
    }
}