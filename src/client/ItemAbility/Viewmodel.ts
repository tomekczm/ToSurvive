import { Players, ReplicatedStorage, RunService, UserInputService, Workspace } from "@rbxts/services";
import { isInFirstPerson } from "client/FirstPersonMode";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const NoRay = Workspace.WaitForChild("NoRay")
const viewmodel = ReplicatedStorage.Viewmodel.Clone()
viewmodel.Parent = ReplicatedStorage

const animator = viewmodel.AnimationController.Animator

const animations = ReplicatedStorage.Animations

export class Viewmodel extends Ability<ClientItem> {
    connection: RBXScriptConnection | undefined;
    connectionAttribute: RBXScriptConnection | undefined
    rigid!: RigidConstraint
    clone!: Instance;

    fetchAnimation(name: string) {
        const itemName = this.item.item.Name
        const animationFolder = animations.FindFirstChild(itemName)
        return animationFolder?.FindFirstChild(name) as Animation
    }

    

    onStart(): void {
        this.clone = this.item.item.Clone();
        this.clone.FindFirstAncestorWhichIsA("RigidConstraint")?.Destroy()
        this.rigid = new Instance("RigidConstraint")
        this.rigid.Parent = this.clone;
        this.item.unequipEvent.Connect(() => {
            this.clone.Parent = ReplicatedStorage
            this.connection?.Disconnect()
            viewmodel.Parent = ReplicatedStorage
        })

        this.item.equipEvent.Connect(() => {
            this.clone.Parent = viewmodel
            const attach = viewmodel["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
            
            const rootPart = this.clone.FindFirstChild("RootPart")
            const attachment = rootPart?.FindFirstChild("Attachment") as Attachment
            this.rigid.Attachment0 = attachment
            this.rigid.Attachment1 = attach

            const animation = animator.LoadAnimation(this.fetchAnimation("VM_Hold"))
            let time = 0;
            this.connection = RunService.RenderStepped.Connect((dt) => {
                time += dt;
                let cframe = Workspace.CurrentCamera!.CFrame
                //const newPos = cframe.add(cframe.LookVector.mul(1).add(cframe.UpVector.mul(0)))
                //const offsets = new CFrame(cframe.UpVector.mul(math.sin(time) * 0.1))
                //cframe = newPos.mul(offsets)
                const sinY = -math.abs(math.sin(time) * 0.1)
                const sinX = 0.05 * math.cos(time);
        
                const walkOffset = 
                    cframe.RightVector.mul(sinX) // Horizontal component
                    .add(cframe.UpVector.mul(sinY)); // Vertical component, with phase shift

                if(isInFirstPerson()) {
                    viewmodel.Parent = NoRay
                } else {
                    viewmodel.Parent = ReplicatedStorage
                }
        
                cframe = cframe.add(walkOffset);
            
                viewmodel.PivotTo(cframe);
                animation.Play();
            })
        })
    }
}