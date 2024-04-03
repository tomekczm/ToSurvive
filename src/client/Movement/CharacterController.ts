import { ContentProvider, Players, ReplicatedStorage, RunService } from "@rbxts/services";
import { onCharacterAdded } from "client/Events/OnCharacterAdded";

const animations = ReplicatedStorage.Animations

const WALKING_ANIMATION = animations.Walking
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

function onCharacter(character: Model) {
    const root = character.WaitForChild("HumanoidRootPart") as BasePart
    const speedModifier = character.WaitForChild("ControllerManager").WaitForChild("GroundController") as GroundController
    const humanoid = character.WaitForChild("Humanoid") as Humanoid
    const animator = humanoid.WaitForChild("Animator") as Animator
    const walkAnimation = animator.LoadAnimation(WALKING_ANIMATION)
    const idleAnimation = animator.LoadAnimation(IDLE_ANIMATION)

    idleAnimation.Play()

    humanoid.StateChanged.Connect((oldState, newState) => {
        if(oldState === Enum.HumanoidStateType.Running) {
            deaccelerateWalk(walkAnimation, speedModifier.DecelerationTime)
        }
        if(newState === Enum.HumanoidStateType.Running) {
            walkAnimation.Play()
            accelerateWalk(walkAnimation, speedModifier.AccelerationTime)
        }
    })
}

onCharacterAdded((model) => onCharacter(model))