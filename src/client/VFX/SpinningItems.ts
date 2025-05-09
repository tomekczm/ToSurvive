import { CollectionService, RunService } from "@rbxts/services";
import { SetProximity } from "client/ProximityPrompts";
import { quadraticBezier } from "shared/Bezier";

CollectionService.GetInstanceAddedSignal("DroppedItem").Connect((instance) => {
    if(instance.IsA("Model")) {
        let timePassed = 0

        const descendants = instance.GetDescendants()

        descendants.forEach((descendant) => {
            if(descendant.Name !== "PickUp") return
            if(!descendant.IsA("ProximityPrompt")) return
            descendant.Enabled = false
            SetProximity(descendant, true)
        })
        const start = instance.GetAttribute("StartPos") as Vector3
        const endPoint = instance.GetPivot().Position
        const midPoint = start.Lerp(endPoint, 0.5).add(new Vector3(0,3,0))

        let offset = CFrame.Angles(0,math.random(0, 360),0)

        const connection = RunService.RenderStepped.Connect((dt) => {
            if(!instance) return connection.Disconnect()
            timePassed += dt * 2
            timePassed = math.min(1, timePassed)
            
            offset = offset.mul(CFrame.Angles(0, dt, 0))

            if(timePassed < 1) {
                const result = quadraticBezier(timePassed, start, midPoint, endPoint)
                instance.PivotTo(new CFrame(result).mul(offset))
            } else {
                const goal = new CFrame(endPoint).mul(offset)
                instance.PivotTo(goal)
            }
        })
    }
})