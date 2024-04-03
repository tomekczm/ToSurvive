import { Players, RunService, TweenService } from "@rbxts/services";
import { onCharacterAdded } from "./Events/OnCharacterAdded";

const player = Players.LocalPlayer
const gui = player.WaitForChild("PlayerGui").WaitForChild("SafeGui").WaitForChild("Text") as TextBox

const tweenInfo = new TweenInfo(2)
const fadeOut = TweenService.Create(gui, tweenInfo, {
    TextTransparency: 1
})

let isOutside = true
let dissapearDelay: thread | undefined

function appear(text: string) {
    gui.Text = text
    gui.TextTransparency = 0.5
    if(dissapearDelay) task.cancel(dissapearDelay)
    dissapearDelay = task.spawn(() => {
        task.wait(5)
        fadeOut.Play()
    })
}

function onCharacter(character: Model) {

    isOutside = true
    const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart
    RunService.RenderStepped.Connect(() => {
        const newPos = new Vector3(humanoidRootPart.Position.X, 0, humanoidRootPart.Position.Z)
        const halfSize = 300 / 2
        let newIsOutside = newPos.X >= -halfSize && newPos.X <= halfSize &&
                                newPos.Y >= -halfSize && newPos.Y <= halfSize &&
                                newPos.Z >= -halfSize && newPos.Z <= halfSize
        if(newIsOutside && !isOutside)
            appear("You entered the base.")
        if(!newIsOutside && isOutside)
            appear("You left the base.")
        isOutside = newIsOutside
    })
}

onCharacterAdded((model) => onCharacter(model))