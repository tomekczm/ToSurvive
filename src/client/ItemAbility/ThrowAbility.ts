import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const player = Players.LocalPlayer
const mouse = player.GetMouse()
const target = new Instance("Attachment")
target.Parent = Workspace.Terrain


import "../VFX/MousePointer"
import { isInFirstPerson } from "client/FirstPersonMode";

const info = new TweenInfo(1)

type Mode = "RightAttach" | "TorsoAttach"
export class ThrowAbility extends Ability<ClientItem> {
    private event: RBXScriptConnection | undefined

    hasSecoundaryHand: boolean = false;
    private primaryControl!: IKControl;
    humanoid: Humanoid | undefined;
    private inputEnded!: RBXScriptConnection;
    private inputBegan!: RBXScriptConnection;
    enabled = false;

    enablePrimaryControl() {
        this.primaryControl.Enabled = true
    }

    disablePrimaryControl() {
        this.primaryControl.Enabled = false
    }

    enable() {
        this.enabled = true;
        const instance = this.item.item
        instance.SetAttribute("IsAiming", true)

        UserInputService.MouseDeltaSensitivity = 0.1
        this.item.invokeEvent("PrepareThrow")

        const character = player.Character
        if(!character) return
        const IKControl = character.FindFirstChild("RightAttach") as IKControl
        this.primaryControl = IKControl  
        this.tweenCamera(false)  

        //this.primaryControl.SmoothTime = 0.15

        this.enablePrimaryControl()
        this.primaryControl.Target = target

        mouse.TargetFilter =  Workspace.WaitForChild("NoRay")

        const camera = Workspace!.CurrentCamera as Camera
        this.event = RunService.RenderStepped.Connect(() => {  
            //const viewportCenter = new Vector2(camera.ViewportSize.X/2, camera.ViewportSize.Y/2)
            //const viewportRay = camera.ViewportPointToRay(viewportCenter.X, viewportCenter.Y, 500)
            const unitRay = mouse.UnitRay
            target.Position = character.GetPivot().add(unitRay.Direction.mul(500)).Position  //mouse.Hit.Position//unitRay.Origin.add(unitRay.Direction.mul(500))
        })
    }

    tweenCamera(enabled: boolean) {
        const tweenCFrame = (enabled) ? new Vector3(2.5,0,0) : new Vector3(2,0,0)
        const fov = (enabled) ? 70 : 30;
        const weight = (enabled) ? 1 : 0
        const endWeight = (enabled) ? 0 : 1
        
        if(this.primaryControl) {
            this.primaryControl.Weight = weight;

            TweenService.Create(
                this.primaryControl,
                info,
                {
                    Weight: endWeight
                }
            ).Play()
        }

        if(this.humanoid && !isInFirstPerson()) {
            TweenService.Create(
                this.humanoid,
                info,
                {
                    CameraOffset: tweenCFrame
                }
            ).Play()
        }
        const camera = Workspace.CurrentCamera
        if(camera) {
            TweenService.Create(
                camera,
                info,
                {
                    FieldOfView: fov
                }
            ).Play()
        }
    }

    disable() {
        this.enabled = false;
        const instance = this.item.item
        instance.SetAttribute("IsAiming", false)

        UserInputService.MouseDeltaSensitivity = 1
        this.tweenCamera(true)
        this.item.invokeEvent("ThrowStop")
    }

    constructor(item: ClientItem) {
        super(item);

        const itself = this.item.item as Model
        item.equipEvent.Connect(() => {
            this.humanoid = Players.LocalPlayer.Character?.FindFirstChild("Humanoid") as Humanoid
            this.inputBegan = UserInputService.InputBegan.Connect((input) => {
                if(input.UserInputType === Enum.UserInputType.MouseButton2)
                    this.enable()
                if(input.UserInputType === Enum.UserInputType.MouseButton1 && this.enabled)
                    this.item.invokeEvent("Throw", itself.GetPivot().Position,mouse.Hit)
            })
            this.inputEnded = UserInputService.InputEnded.Connect((input) => {
                if(input.UserInputType === Enum.UserInputType.MouseButton2)
                    this.disable()
            })
        })

        item.unequipEvent.Connect(() => {
            this.event?.Disconnect()
            this.disable()
            this.inputBegan.Disconnect()
            this.inputEnded.Disconnect()
        })
    }
}