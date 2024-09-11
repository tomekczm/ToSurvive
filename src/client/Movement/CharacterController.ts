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
    //const root = character.WaitForChild("HumanoidRootPart") as BasePart
    //const speedModifier = character.WaitForChild("ControllerManager").WaitForChild("GroundController") as GroundController
    const humanoid = character.WaitForChild("Humanoid") as Humanoid
    const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart
    const animator = humanoid.WaitForChild("Animator") as Animator
    const WalkForward = animator.LoadAnimation(WALKING_ANIMATION)
    const WalkLeft = animator.LoadAnimation(WALKING_ANIMATION)
    const WalkRight = animator.LoadAnimation(WALKING_ANIMATION)
    const walkbackwardsAnimation = animator.LoadAnimation(WALKING_BACKWARDS_ANIMATION)
    const Idle = animator.LoadAnimation(IDLE_ANIMATION)

    //Idle.Play()
    //walkbackwardsAnimation.Play()
    RunService.RenderStepped.Connect((dt) => {

        /*
        const DirectionOfMovement = humanoidRootPart.CFrame.VectorToObjectSpace(humanoidRootPart.AssemblyLinearVelocity)

        const Forward = math.abs( math.clamp( DirectionOfMovement.Z / humanoid.WalkSpeed, -1, -0.01 ) )
        const Backwards = math.abs( math.clamp( DirectionOfMovement.Z / humanoid.WalkSpeed, 0.01, 1 ) )
        const Right = math.abs( math.clamp( DirectionOfMovement.X / humanoid.WalkSpeed, 0.01, 1 ) )
        const Left = math.abs( math.clamp( DirectionOfMovement.X / humanoid.WalkSpeed, -1, -0.01 ) )
    
        const SpeedUnit = (DirectionOfMovement.Magnitude / humanoid.WalkSpeed)
    
        const State = humanoid.GetState()
    
        if(DirectionOfMovement.Magnitude > 0.1) {
            if (!WalkForward.IsPlaying) {
                WalkForward.Play( 0,0.01,0 )
                WalkRight.Play( 0,0.01,0  )
                WalkLeft.Play( 0,0.01,0  )
            }
        }

        if(DirectionOfMovement.Z/humanoid.WalkSpeed < 0.1) {
    
            WalkForward.AdjustWeight( Forward )
            WalkRight.AdjustWeight( Right )
            WalkLeft.AdjustWeight( Left )
    
            WalkForward.AdjustSpeed( SpeedUnit )
            WalkRight.AdjustSpeed( SpeedUnit )
            WalkLeft.AdjustSpeed( SpeedUnit )
    
            Idle.AdjustWeight(0.001)
    
        } else {
    
            WalkForward.AdjustWeight( Backwards )
            WalkRight.AdjustWeight( Left )
            WalkLeft.AdjustWeight( Right )
    
            WalkForward.AdjustSpeed(-SpeedUnit)
            WalkRight.AdjustSpeed(-SpeedUnit)
            WalkLeft.AdjustSpeed(-SpeedUnit)
    
            Idle.AdjustWeight(0.001)
    
        }
    
    
        if(DirectionOfMovement.Magnitude < 0.1) {
            Idle.AdjustWeight(1)
        }
            */
    
    })
}


onCharacterAdded((model) => onCharacter(model))