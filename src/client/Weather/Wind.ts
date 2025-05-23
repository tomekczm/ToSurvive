import Rain from "@rbxts/rain"
import { RunService, SoundService, TweenService, Workspace } from "@rbxts/services"
import WindShake from "./WindShake/WindShake"
import { shake } from "client/CamShake"
import CameraShaker, { CameraShakeInstance } from "@rbxts/camera-shaker"
import { getSeason } from "./Seasons"

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

let connection: RBXScriptConnection | undefined
const clouds = Workspace.Terrain.WaitForChild("Clouds") as Clouds;

function calcRainingCover() {
    if(getSeason() === "spring") {
        return math.random(0, 677) / 1000
    } else {
        return math.random(677, 1000) / 1000
    }
}

Workspace.GetAttributeChangedSignal("Weather").Connect(() => {
    const weather = Workspace.GetAttribute("Weather")

    const rng = new Random()
    const vector = new Vector3(
        rng.NextNumber(-25, 25),
        0,
        rng.NextNumber(-25, 25)
    )
    const variation = rng.NextNumber(0.2, 0.5)
    const startSpeed = rng.NextNumber(1, 5)
    const intensity = rng.NextNumber(0.1, 1)

    const tweenInfo = new TweenInfo(startSpeed)

    if(weather === "Rain") {
        SoundService.Wind.Play()
        //shake.ShakeSustain(
        //    CameraShaker.Presets.RoughDriving
        //)
        Rain.SetIntensityRatio(intensity)
        Rain.Enable(tweenInfo)

        const tween = TweenService.Create(
            Workspace,
            tweenInfo,
            {
                GlobalWind: vector
            }
        )
        
        tween.Play()

        clouds.SetAttribute("Cover", calcRainingCover())
        
        task.wait(10)
        
        tween.Play()
        
        tween.Completed.Once(() => {
            let _time = 0;
            connection = RunService.RenderStepped.Connect((dt) => {
                _time += dt;
                const noise = math.noise(_time) * variation
                const converted = (noise + 1) / 2
                Workspace.GlobalWind = vector.mul(converted);
            })
        })        
    } else {
        Rain.Disable(tweenInfo)
        SoundService.Wind.Stop()
        connection?.Disconnect()

        const tween = TweenService.Create(
            Workspace,
            tweenInfo,
            {
                GlobalWind: new Vector3(0,0,0)
            }
        )
        
        tween.Play()
        clouds.SetAttribute("Cover", math.random(0, 677) / 1000)
        task.wait(10)
    }
})