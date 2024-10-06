import { CollectionService, RunService, TweenService } from "@rbxts/services";

const info = new TweenInfo(2)
const transparency = {
    Transparency: 1
}

CollectionService.GetInstanceAddedSignal("Ragdoll").Connect((_instance) => {
    const instance = _instance as ServerStorage["Models"]["ZombieModel"]
    const humanoidRoot = (instance as ServerStorage["Models"]["ZombieModel"]).HumanoidRootPart
    const noob = (_instance.WaitForChild("RagdollTarget") as ObjectValue).Value as ServerStorage["Models"]["Ragdoll"]
    const hips = humanoidRoot["mixamorig:Hips"]
    const spine = hips["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]

    const rightShoulder = spine["mixamorig:RightShoulder"]
    const rightUpperArm = rightShoulder["mixamorig:RightArm"]
    const rightForeArm = rightUpperArm["mixamorig:RightForeArm"]
    const rightHand = rightForeArm["mixamorig:RightHand"]

    const leftShoulder = spine["mixamorig:LeftShoulder"]
    const leftUpperArm = leftShoulder["mixamorig:LeftArm"]
    const leftForeArm = leftUpperArm["mixamorig:LeftForeArm"]
    const leftHand = leftForeArm["mixamorig:LeftHand"]

    const rightLeg = hips["mixamorig:RightUpLeg"]["mixamorig:RightLeg"]["mixamorig:RightFoot"]
    const leftLeg = hips["mixamorig:LeftUpLeg"]["mixamorig:LeftLeg"]["mixamorig:LeftFoot"]

    const head = spine["mixamorig:Neck"]["mixamorig:Head"]

    const connection = RunService.RenderStepped.Connect(() => {
    
        hips["mixamorig:RightUpLeg"].WorldCFrame = noob.RightUpperLeg.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        hips["mixamorig:RightUpLeg"]["mixamorig:RightLeg"].WorldCFrame = noob.RightLowerLeg.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        rightLeg.WorldCFrame = noob.RightFoot.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
    
        hips["mixamorig:LeftUpLeg"].WorldCFrame = noob.LeftUpperLeg.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        hips["mixamorig:LeftUpLeg"]["mixamorig:LeftLeg"].WorldCFrame = noob.LeftLowerLeg.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        leftLeg.WorldCFrame = noob.LeftFoot.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
    
    
        hips.WorldCFrame = noob.LowerTorso.CFrame.mul(CFrame.Angles(0, 0, 0))
    
        rightUpperArm.WorldCFrame = noob.RightUpperArm.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        rightShoulder.WorldCFrame = noob.UpperTorso.RShoulder.WorldCFrame
        rightForeArm.WorldCFrame = noob.RightLowerArm.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        rightHand.WorldCFrame = noob.RightHand.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
    
        leftUpperArm.WorldCFrame = noob.LeftUpperArm.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        leftShoulder.WorldCFrame = noob.UpperTorso.LShoulder.WorldCFrame
        leftForeArm.WorldCFrame = noob.LeftLowerArm.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
        leftHand.WorldCFrame = noob.LeftHand.CFrame.mul(CFrame.Angles(0, 0, math.rad(180)))
    })

    
    task.wait(20)

    connection.Disconnect()
    instance.GetChildren().forEach((part) => {
        if(!part.IsA("BasePart")) return
        TweenService.Create(
            part,
            info,
            transparency
        ).Play()
    })

})