import { ContentProvider, ReplicatedStorage, ServerStorage } from "@rbxts/services";

const descendants = ReplicatedStorage.WaitForChild("ItemAnimations").GetDescendants()
const toLoad: Animation[] = []

descendants.forEach((instance) => {
    if(instance.IsA("Animation")) {
        toLoad.push(instance)
    }
})

ContentProvider.PreloadAsync(toLoad)