import { RunService, SoundService } from "@rbxts/services";
import { onCharacterAdded } from "client/Events/OnCharacterAdded";
import { getSeason } from "client/Weather/Seasons";

const walkSound = SoundService.WalkSounds

const map = new Map<Enum.Material, Sound>([
    [Enum.Material.Grass, walkSound.Grass],
    [Enum.Material.LeafyGrass, walkSound.Forest],

    [Enum.Material.Ground, walkSound.Dirt],
    //[Enum.Material.Ground, walkSound.Gravel],
    [Enum.Material.Fabric, walkSound.Fabric],
    [Enum.Material.Marble, walkSound.Marble],
    [Enum.Material.Metal, walkSound.Metal],
    [Enum.Material.Sand, walkSound.Sand],
    [Enum.Material.Wood, walkSound.Wood],

    [Enum.Material.Snow, walkSound.Snow],
    [Enum.Material.Glacier, walkSound.Snow],
])

let humanoid: Humanoid;
let sum = 0;
let currentFloorMat: Sound | undefined
RunService.RenderStepped.Connect((dt) => {
    sum += dt;
    if(humanoid && humanoid.MoveDirection.Magnitude !== 0) {
        let newFloorMat = map.get(humanoid.FloorMaterial)
                if(newFloorMat === walkSound.Grass && getSeason() === "winter") {
            newFloorMat = walkSound.Snow
        }

        if(currentFloorMat !== newFloorMat) {
            currentFloorMat?.Stop()
            newFloorMat?.Play()
        }
        currentFloorMat = newFloorMat;
    } else {
        currentFloorMat?.Stop()
        currentFloorMat = undefined
    }
    walkSound.PitchShiftSoundEffect.Octave = math.clamp((math.noise(sum) + 1.5) / 2, 0, 1)
})

onCharacterAdded((model) => {
    humanoid = model.WaitForChild("Humanoid") as Humanoid
})