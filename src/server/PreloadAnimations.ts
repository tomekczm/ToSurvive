import { ContentProvider, ServerStorage } from "@rbxts/services";

const descendants = ServerStorage.Animations.GetDescendants()
const toLoad: Animation[] = []

descendants.forEach((instance) => {
    if(instance.IsA("Animation")) {
        toLoad.push(instance)
    }
})

ContentProvider.PreloadAsync(toLoad)