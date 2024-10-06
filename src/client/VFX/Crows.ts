import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { sample } from "shared/Array";
const crow = ReplicatedStorage.Prefabs.Crow

function spawn() {
    const anim = sample(ReplicatedStorage.Prefabs.CrowFlight.GetChildren()) as Animation
    const radius = 500
    const theta = math.random() * 2 * math.pi
    const x = radius * math.cos(theta)
    const y = radius * math.sin(theta)

    const crowContainer = new Instance("Model")
    crowContainer.Parent = Workspace
    const ogSpawn = new CFrame(new Vector3(x, 300, y), new Vector3(0, 300 ,0))
    for(let i = 0; i < 10; i++) {
        const clone = crow.Clone()
        const varietySpawn = ogSpawn.add(
            ogSpawn.RightVector.mul(math.random(-15, 15))
        ).add(
            ogSpawn.LookVector.mul(math.random(-15, 15))
        )
        clone.PivotTo(varietySpawn)
        clone.Parent = crowContainer
        task.delay(math.random(100, 1000) / 100, () => {
            const loaded = clone.AnimationController.Animator.LoadAnimation(anim);
            loaded.Play()
        })
    }

    const connection = RunService.RenderStepped.Connect((dt) => {
        crowContainer.PivotTo(
            crowContainer.GetPivot().add(ogSpawn.LookVector.mul(dt * 10))
        )
    })

    task.delay(60, () => {
        connection.Disconnect()
        crowContainer.Destroy()
    })
}

task.spawn(() => {
    while(true) {
        task.wait(math.random(10, 120))
        spawn()
    }
})