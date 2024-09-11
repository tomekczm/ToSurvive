import { Players, RunService, Workspace } from "@rbxts/services";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const player = Players.LocalPlayer
const mouse = player.GetMouse()
const target = new Instance("Attachment")
target.Parent = Workspace.Terrain

type Mode = "RightAttach" | "TorsoAttach"
export class PointAtAbility extends Ability<ClientItem> {
    private event: RBXScriptConnection | undefined

    hasSecoundaryHand: boolean = false;
    private primaryControl!: IKControl;
    private altControl!: IKControl;

    enablePrimaryControl() {
        this.primaryControl.Enabled = true
    }

    disablePrimaryControl() {
        this.primaryControl.Enabled = false
    }

    enableSecondaryControl() {
        this.altControl.Enabled = true
    }

    disableSecondaryControl() {
        this.altControl.Enabled = false
    }

    constructor(item: ClientItem, mode: Mode = "RightAttach") {
        super(item);
        const altHand = this.item.item.FindFirstChild("RootPart")?.FindFirstChild("AlternativeHand") as Attachment

        const character = player.Character
        if(!character) return
        const IKControl = character.FindFirstChild(mode) as IKControl
        this.primaryControl = IKControl

        item.equipEvent.Connect(() => {

            if(altHand) {
                this.hasSecoundaryHand = true;
    
                const altControl = character.FindFirstChild("LeftAttach") as IKControl
                altControl.Target = altHand
                this.altControl = altControl
                this.enableSecondaryControl()
            }
    
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
        })

        item.unequipEvent.Connect(() => {
            this.event?.Disconnect()

            const character = player.Character
            if(!character) return
            const IKControl = character.FindFirstChild(mode) as IKControl
            IKControl.Enabled = false
            const altControl = character.FindFirstChild("LeftAttach") as IKControl
            altControl.Enabled = false
        })
    }
}