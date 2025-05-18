import { ProximityPromptService, ReplicatedStorage } from "@rbxts/services";
import { CollectAbility } from "server/ItemAbilities/CollectAbility";
import { ServerItem } from "./ServerItem";

type Constraint = ReplicatedStorage["Tools"]["Flint"]
export class FlintItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Flint.Clone())
    }
}

type RawMeat = ReplicatedStorage["Tools"]["Meat"]
export class RawMeatItem extends ServerItem<RawMeat> {
    constructor() {
        super(ReplicatedStorage.Tools.Meat.Clone())
    }
}

type WoodenLog = ReplicatedStorage["Tools"]["Wooden Log"]
export class WoodenLogItem extends ServerItem<WoodenLog> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Log"].Clone())
    }
}

export class PickaxeHead extends ServerItem<WoodenLog> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Log"].Clone())
    }
}

export class AxeHead extends ServerItem<WoodenLog> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Log"].Clone())
    }
}

export class SharpRock extends ServerItem<WoodenLog> {
    constructor() {
        super(ReplicatedStorage.Tools["Wooden Log"].Clone())
    }
}