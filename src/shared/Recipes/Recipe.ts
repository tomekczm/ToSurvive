import { Item } from "shared/Item";

export class Stack<T = Item> {
    constructor(public item: T, public quantity = 1) {}
}

export class Recipe<T = Item, R = Stack<Item>> {
    requirements!: Stack<T>[];
    result!: R;
    setRecipe(...requirements: Stack<T>[]) {
        this.requirements = requirements;
        
        return this
    }
    setResult(result: R) {
        this.result = result;
        return this;
    }
}

export class FloorRecipe {
    
}

/*
export const recipes: Recipe<Item, Model>[] = [
    new Recipe<Item, Model>().setRecipe(
        new Stack(new Item(ReplicatedStorage.Tools.Sword), 3)
    ).setResult(ReplicatedStorage.Builds["Wooden Wall"]),
    new Recipe<Item, Model>().setRecipe(
        new Stack(new Item(ReplicatedStorage.Tools.Sword), 3)
    ).setResult(ReplicatedStorage.Builds["Wooden Wall"])
]

for(const i of $range(1, recipes.size())) {
    reverseLookup.set(recipes[i - 1], i)
}


*/
export function createRecipeBook<T, E>(recipes: Recipe<T,E>[]) {
    const reverseLookup = new Map<Recipe<T,E>, number>()
    for(const i of $range(1, recipes.size())) {
        reverseLookup.set(recipes[i - 1], i)
    }
    return {
        recipes: recipes,
        reverseLookup: reverseLookup
    }
}