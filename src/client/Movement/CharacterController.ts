import { ContentProvider, Players, ReplicatedStorage, RunService, UserInputService, Workspace } from "@rbxts/services";
import { onCharacterAdded } from "client/Events/OnCharacterAdded";

const animations = ReplicatedStorage.Animations

const WALKING_ANIMATION = animations.Walking
const WALKING_BACKWARDS_ANIMATION = animations.WalkBackwards
const IDLE_ANIMATION = animations.Idle

const localPlayer = Players.LocalPlayer

ContentProvider.PreloadAsync([ WALKING_ANIMATION, IDLE_ANIMATION ])

let deaccelerationConnection: RBXScriptConnection
let accelerationConnection: RBXScriptConnection

function accelerateWalk(animation: AnimationTrack, duration: number) {
    let sumDt = 0;
    deaccelerationConnection?.Disconnect()
    accelerationConnection = RunService.RenderStepped.Connect((dt) => {
        sumDt += dt
        if(sumDt >= duration) {
            accelerationConnection.Disconnect()
        }
        const factor = math.clamp(sumDt / duration, 0, 1)
        animation.AdjustSpeed(factor)
    })
}

function deaccelerateWalk(animation: AnimationTrack, duration: number) {
    let sumDt = duration;
    accelerationConnection?.Disconnect()
    animation.Stop(duration)
    deaccelerationConnection = RunService.RenderStepped.Connect((dt) => {
        sumDt -= dt
        if(sumDt <= 0) {
            deaccelerationConnection.Disconnect()
        }
        const factor = math.clamp(sumDt / duration, 0, 1)
        animation.AdjustSpeed(factor)
    })
}


const mouse = Players.LocalPlayer.GetMouse()

function onCharacter(character: Model) {
    character.Parent = Workspace.WaitForChild("Characters")
}


onCharacterAdded((model) => onCharacter(model))