import { CollectionService, RunService, TweenService, Workspace } from "@rbxts/services";

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
// looks BAD without constraints
/*
const ROPE_LENGTH = 2.75;
function buildConnection(base: Bone, to: Bone) {
    const model = base.FindFirstAncestorOfClass("Model")!
    const part = new Instance("Part")
    part.Size = new Vector3(1,1,1)
    const attachment = new Instance("Attachment")
    attachment.Parent = part

    part.CFrame = to.WorldCFrame

    const rope = new Instance("RopeConstraint")
    rope.Attachment1 = attachment
    rope.Attachment0 = base
    rope.Length = ROPE_LENGTH
    rope.Parent = part

    const constraint = new Instance("IKControl")
    constraint.Type = Enum.IKControlType.Position
    constraint.ChainRoot = base;
    constraint.EndEffector = to
    constraint.Target = attachment
    part.Parent = model
    constraint.Parent = model 
    constraint.Name = `${base.Name}->${to.Name}`
}

CollectionService.GetInstanceAddedSignal("Ragdoll").Connect((_instance) => {
    const preInstance = _instance as ServerStorage["Models"]["ZombieModel"]
    const instance = preInstance.Clone();
    CollectionService.RemoveTag(instance, "Ragdoll")
    preInstance.Destroy()
    instance.Parent = Workspace
    instance.Humanoid.SetStateEnabled(Enum.HumanoidStateType.Physics, true)
    const hips = instance.HumanoidRootPart["mixamorig:Hips"]
    const spine = hips["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]
    const leftArmBase = spine["mixamorig:LeftShoulder"]
    const rightArmBase= spine["mixamorig:RightShoulder"]

    const leftAttachBone = leftArmBase["mixamorig:LeftArm"]["mixamorig:LeftForeArm"]
                            ["mixamorig:LeftHand"]["LeftAttachBone"]
    const rightAttachBone = rightArmBase["mixamorig:RightArm"]["mixamorig:RightForeArm"]
                            ["mixamorig:RightHand"]["RightAttachBone"]
    buildConnection(rightArmBase, rightAttachBone)
    buildConnection(leftArmBase, leftAttachBone)
})
    */