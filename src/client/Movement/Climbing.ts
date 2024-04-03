
import { ContentProvider, Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { onCharacterAdded } from "client/Events/OnCharacterAdded";

const animations = ReplicatedStorage.Animations

const CLIMBING_ANIMATION = animations.Climbing

const localPlayer = Players.LocalPlayer

ContentProvider.PreloadAsync([ CLIMBING_ANIMATION ])

function onCharacter(character: Model) {
    const ClimbController = character.WaitForChild("ControllerManager").WaitForChild("ClimbController") as ClimbController
    const humanoid = character.WaitForChild("Humanoid") as Humanoid
    const animator = humanoid.WaitForChild("Animator") as Animator
    const humanoidRootPart = character.WaitForChild("HumanoidRootPart") as BasePart
    const climbModifier = humanoidRootPart.WaitForChild("ClimbSensor") as ControllerPartSensor
    climbModifier.UpdateType = Enum.SensorUpdateType.OnRead /* Enum.SensorUpdateType.Manual */

    const animationLoaded = animator.LoadAnimation(CLIMBING_ANIMATION)

    const config = new RaycastParams()
    config.FilterDescendantsInstances = [ character ]

    RunService.RenderStepped.Connect(() => {

        /*
            const result = Workspace.Raycast(humanoidRootPart.Position, humanoidRootPart.CFrame.LookVector.mul(climbModifier.SearchDistance), config)
            if(!result) {
                if(animationLoaded.IsPlaying) animationLoaded.Stop()
                climbModifier.SensedPart = undefined
                return
            }
        */

        if(!climbModifier.SensedPart /*&& !result*/) return
        if(!animationLoaded.IsPlaying) animationLoaded.Play()

        ClimbController.MoveSpeedFactor = 0.3

        if(humanoid.MoveDirection.Magnitude === 0) {
            animationLoaded.AdjustSpeed(0)
        } else {
            animationLoaded.AdjustSpeed(0.5)
        }

        
        //climbModifier.HitFrame = new CFrame(result.Position)
        //climbModifier.SensedPart = result.Instance
        //climbModifier.HitNormal = result.Normal
        
    })
}

onCharacterAdded((model) => onCharacter(model))