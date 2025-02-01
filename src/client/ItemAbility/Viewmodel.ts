import { Players, ReplicatedStorage, RunService, UserInputService, Workspace } from "@rbxts/services";
import { isInFirstPerson } from "client/FirstPersonMode";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const NoRay = Workspace.WaitForChild("NoRay")
const viewmodel = ReplicatedStorage.Viewmodel.Clone()
viewmodel.Parent = ReplicatedStorage

const animator = viewmodel.AnimationController.Animator
export const VIEWMODEL_ANIMATOR = animator

const animations = ReplicatedStorage.Animations

//DEBUG STATEMENTS
let isInFreeCam = false
warn("DEBUG MODE ON")
UserInputService.InputBegan.Connect(() => {
    if(UserInputService.IsKeyDown(Enum.KeyCode.P)) {
        isInFreeCam = !isInFreeCam
        print(`FREECAM: ${(isInFreeCam) ? "On" : "Off" }`)
    }
})


export class Viewmodel extends Ability<ClientItem> {
    connection: RBXScriptConnection | undefined;
    connectionAttribute: RBXScriptConnection | undefined
    rigid!: RigidConstraint
    clone!: Instance;
    animation?: AnimationTrack;
    offset: Vector3 = new Vector3(0,0,0);
    animator: Animator | undefined;

    fetchAnimation(name: string) {
        const itemName = this.item.item.Name
        const animationFolder = animations.FindFirstChild(itemName)
        return animationFolder?.FindFirstChild(name) as Animation
    }

    loadAnimation(name: string) {
        return animator.LoadAnimation(this.fetchAnimation(name))
    }

    offsetChanged() {
        this.offset = this.clone.GetAttribute("ViewportOffset") as Vector3 ?? new Vector3(0,0,0)
    }

    getViewportOffset(cframe: CFrame) {
        return cframe.XVector.mul(this.offset.X)
            .add(cframe.YVector.mul(this.offset.Y))
            .add(cframe.ZVector.mul(this.offset.Z)) 
    }

    onUnequip() {
        this.clone.Parent = ReplicatedStorage
        this.connection?.Disconnect()
        viewmodel.Parent = ReplicatedStorage
    }

    onEquip() {
        this.clone.Parent = viewmodel
        const attach = viewmodel["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
            
            const rootPart = this.clone.FindFirstChild("RootPart")
            const attachment = rootPart?.FindFirstChild("Attachment") as Attachment
            this.rigid.Attachment0 = attachment
            this.rigid.Attachment1 = attach

            animator.GetPlayingAnimationTracks().forEach((e) => {
                e.Stop()
            })

            this.animator = animator
            this.animation = animator.LoadAnimation(this.fetchAnimation("VM_Hold"))
            let time = 0;
            
            this.animation?.Play();

            let lastCFrame: CFrame = Workspace.CurrentCamera!.CFrame
            this.connection = RunService.RenderStepped.Connect((dt) => {
                time += dt;
                let cframe = lastCFrame
                if(!isInFreeCam) {
                    cframe = Workspace.CurrentCamera!.CFrame
                }
                
                lastCFrame = cframe
                //const newPos = cframe.add(cframe.LookVector.mul(1).add(cframe.UpVector.mul(0)))
                //const offsets = new CFrame(cframe.UpVector.mul(math.sin(time) * 0.1))
                //cframe = newPos.mul(offsets)
                const sinY = -math.abs(math.sin(time) * 0.1)
                const sinX = 0.05 * math.cos(time);
        
                //print(cframe)

                const walkOffset = 
                    cframe.RightVector.mul(sinX) // Horizontal component
                    .add(cframe.UpVector.mul(sinY))
    

                if(isInFirstPerson()) {
                    viewmodel.Parent = NoRay
                } else {
                    viewmodel.Parent = ReplicatedStorage
                }
        
                cframe = cframe.add(walkOffset)
                cframe = cframe.add(this.getViewportOffset(cframe));
            
                viewmodel.PivotTo(cframe);
            })
    }

    onStart(): void {
        this.clone = this.item.item.Clone();

        this.offsetChanged()
        this.clone.GetAttributeChangedSignal("ViewportOffset").Connect(() => {
            print("offset cha")
            this.offsetChanged()
        })

        this.clone.FindFirstAncestorWhichIsA("RigidConstraint")?.Destroy()
        this.rigid = new Instance("RigidConstraint")
        this.rigid.Parent = this.clone;
    }
}