import { CollectionService, TweenService } from "@rbxts/services";

const info = new TweenInfo(1)
const goal = {
    Transparency: 1
}

CollectionService.GetInstanceAddedSignal("ProjectileDissapearVFX").Connect((instance) => {
    if(!instance.IsA("BasePart")) return
    task.wait(3)
    TweenService.Create(
        instance,
        info, goal 
    ).Play()
})