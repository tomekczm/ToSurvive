import { CollectionService, TweenService } from "@rbxts/services";

const tweenInfo = new TweenInfo(0.125 / 2)

export function hurtHighlight(item: Instance) {
    let highlight = item as Highlight

    const tween = TweenService.Create(highlight, tweenInfo, {
        FillTransparency: 0.75
    })
    tween.Play()
    tween.Completed.Wait()
    TweenService.Create(highlight, tweenInfo, {
        FillTransparency: 1
    }).Play()
}

CollectionService.GetInstanceAddedSignal("Hurt").Connect((item) => {
    hurtHighlight(item)
})