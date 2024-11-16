import { CollectionService, RunService } from "@rbxts/services";

type Soul = ServerStorage["Models"]["Soul"]

const SPEED = 1;
const halfFullRotation = CFrame.Angles(0, math.rad(180),0)

CollectionService.GetInstanceAddedSignal("Soul").Connect((_soul) => {
    const soul = _soul as Soul;

    function distanceTo(position: Vector3) {
        const pivot = soul.GetPivot().Position
        return pivot.sub(position).Magnitude
    }
    
    const connection = RunService.RenderStepped.Connect((dt) => {
        const value = soul.SoulFragment.Value.Value as Model
        print(value)
        const position = value.GetPivot().Position;
        const pivot = soul.GetPivot()
        const distance = distanceTo(position)

        const rotated = new CFrame(pivot.Position, position)
        const lookVector = rotated.LookVector
        const distanceToTravel = math.min(distance, SPEED * dt)

        const toTravel = lookVector.mul(distanceToTravel)

        const newPosition = rotated.add(toTravel).mul(halfFullRotation);

        soul.PivotTo(newPosition)

        soul.Destroying.Once(() => {
            connection.Disconnect()
        })
    })
})