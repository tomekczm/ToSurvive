import { Players, RunService, TweenService, Workspace } from "@rbxts/services";
import { onCharacterAdded } from "./Events/OnCharacterAdded";

const player = Players.LocalPlayer
const gui = player.WaitForChild("PlayerGui").WaitForChild("SafeGui").WaitForChild("Text") as TextBox
const dayGui = player.WaitForChild("PlayerGui").WaitForChild("DayNotificator").WaitForChild("Text") as TextBox

const tweenInfo = new TweenInfo(2)
const fadeOut = TweenService.Create(gui, tweenInfo, {
    TextTransparency: 1
})

let isOutside = true
let dissapearDelay = new Map<Instance, thread>()

function appear(instance: TextBox, text: string) {
    let delay = dissapearDelay.get(instance);
    gui.Text = text
    gui.TextTransparency = 0.5
    if(delay) task.cancel(delay)
    dissapearDelay.set(instance, task.spawn(() => {
        task.wait(5)
        fadeOut.Play()
    }))
}

function showNotification(text: string) { appear(gui, text) } 
function dayUpdate(text: string) { appear(dayGui, text) } 

Workspace.GetAttributeChangedSignal("DateName").Connect(() => {
    dayUpdate(Workspace.GetAttribute("DateName") as string)
})

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
            showNotification("You entered the base.")
        if(!newIsOutside && isOutside)
            showNotification("You left the base.")
        isOutside = newIsOutside
    })
}

onCharacterAdded((model) => onCharacter(model))