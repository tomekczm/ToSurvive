import { ReplicatedStorage } from "@rbxts/services";
import { Item } from "../Item";
import { createRecipeBook, Recipe, Stack } from "./Recipe";

export const { recipes, reverseLookup } = createRecipeBook<Item, Model>([
    new Recipe<Item, Model>().setRecipe(
        new Stack(new Item(ReplicatedStorage.Tools.Sword), 3)
    ).setResult(ReplicatedStorage.Builds["Wooden Wall"]),
    new Recipe<Item, Model>().setRecipe(
        new Stack(new Item(ReplicatedStorage.Tools.Sword), 3)
    ).setResult(ReplicatedStorage.Builds["Wooden Wall"])
])