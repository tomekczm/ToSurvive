import { Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { Ability } from "shared/Ability";
import { recipes, reverseLookup } from "shared/Recipes/HammerRecipes";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { CraftAndBuildAbility } from "client/ItemAbility/CraftAndBuildAbility";
import { Viewmodel } from "client/ItemAbility/Viewmodel";


export class HammerItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new CraftAndBuildAbility(this))
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
        this.abilityManager.add(new Viewmodel(this))
    }
}