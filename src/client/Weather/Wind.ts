import Rain from "@rbxts/rain"
import { RunService, SoundService, TweenService, Workspace } from "@rbxts/services"
import WindShake from "./WindShake/WindShake"
import { shake } from "client/CamShake"
import CameraShaker from "@rbxts/camera-shaker"

const rng = new Random()
const vector = new Vector3(
    rng.NextNumber(-25, 25),
    0,
    rng.NextNumber(-25, 25)
)
const variation = rng.NextNumber(0.2, 0.5)
const startSpeed = rng.NextNumber(1, 5)
const intensity = rng.NextNumber(0.1, 1)

WindShake.Init({
    MatchWorkspaceWind: true
})

Workspace.GetPropertyChangedSignal("GlobalWind").Connect(() => {
    const wind = Workspace.GlobalWind
    const normalized = wind.Magnitude / 36

    const unitVector = new Vector3(
        wind.X / 25,
        -1,
        wind.Z / 25
    )
    Rain.SetDirection(unitVector)

    SoundService.Wind.Volume = normalized;
})

const tweenInfo = new TweenInfo(startSpeed)
Rain.SetIntensityRatio(intensity)
Rain.Enable(tweenInfo)

SoundService.Wind.Play()

const tween = TweenService.Create(
    Workspace,
    tweenInfo,
    {
        GlobalWind: vector
    }
)

tween.Play()

tween.Completed.Once(() => {
    let _time = 0;
    RunService.RenderStepped.Connect((dt) => {
        _time += dt;
        const noise = math.noise(_time) * variation
        const converted = (noise + 1) / 2
        Workspace.GlobalWind = vector.mul(converted);
    })
})
