/*
import { Players, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { Item } from "shared/Item";

const sendSerializedData = ReplicatedStorage.Events.Building.RecieveSerialized

interface SerializedStack {
    name: string,
    thumbnail: string,
    quantity: number,
}

interface SerializedBuilding {
    name: string,
    thumbnail: string,
}

interface Serialize<T> {
    serialize(): T;
}

class ItemStack implements Serialize<SerializedStack> {
    constructor(public item: Model, public quantity = 1) {}

    serialize(): SerializedStack {
        return {
            name: (this.item.GetAttribute("Name") || this.item.Name) as string,
            thumbnail: this.item.GetAttribute("Image") as string,
            quantity: this.quantity
        }
    }
}

class Building implements Serialize<SerializedBuilding> {
    constructor(public item: Model) {}

    serialize() {
        return {
            name: (this.item.GetAttribute("Name") || this.item.Name) as string,
            thumbnail: this.item.GetAttribute("Image") as string
        }
    }
}

interface SerializedRecipe<T> {
    requirements: SerializedStack[],
    result: Serialize<T>
}

export class Recipe<T> {
    recipe: ItemStack[] = [];
    result!: Serialize<T>;

    setResult(result: Serialize<T>) {
        this.result = result;
        return this;
    }

    setRecipe(...items: ItemStack[]) {
        this.recipe = items;
        return this;
    }

    serialize() {
        const requirements: SerializedStack[] = []
        for (const requirement of this.recipe) {
            requirements.push(requirement.serialize())
        }
        return {
            requirements: requirements,
            result: this.result.serialize()
        }
    }
}

export const recipes = [
    new Recipe().setRecipe(
        new ItemStack(ServerStorage.Tools.Sword)
    ).setResult(new Building(ServerStorage.Tools.Sword))
]

export type SerializedRecipes = SerializedRecipe<ItemStack>[]
export type SerializedBuildingRecipes = SerializedRecipe<ItemStack>[]
function serializeRecipes(recipes: SerializedBuildingRecipes) {
    const serialized = []
    for (const recipe of recipes) {
        serialized.push(recipe.serialize())
    }
    return serialized
}

function playerLocated(player: Player) {
    sendSerializedData.FireClient(player, serializeRecipes(recipes))
}

Players.GetPlayers().forEach(playerLocated)

Players.PlayerAdded.Connect(playerLocated)
*/