import { Players, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { SwingAbility } from "client/ItemAbility/SwingAbility";

const mouse = Players.LocalPlayer.GetMouse()

class ShovelClient extends SwingAbility {

    sphere!: Part
    render: RBXScriptConnection | undefined
    range = this.item.getAttribute("Range", 20)
    digSize = this.item.getAttribute("DigSize", 2)

    onStart(): void {
        this.sphere = new Instance("Part")
        this.sphere.Shape = Enum.PartType.Ball
        this.sphere.CastShadow = false
        this.sphere.Anchored = true
        this.sphere.CanCollide = false
        this.sphere.Transparency = 0.5
        this.sphere.Size = new Vector3(this.digSize, this.digSize, this.digSize)
        this.sphere.Material = Enum.Material.Neon
        super.onStart();
    }

    localSwing(): void {
        this.item.invokeEvent("Dig", this.getMouseHit())
        super.localSwing();
    }
    
    getMouseHit() {
        mouse.TargetFilter = this.sphere

        return mouse.Hit.Position
    }

    onEquip() {
        this.sphere.Parent = Workspace
        this.render = RunService.RenderStepped.Connect((dt) => {
            const ballPosition = this.getMouseHit()
            this.sphere.Position = mouse.Hit.Position
            
            const itemPosition = this.item.getPosition()
            const distance = itemPosition.sub(ballPosition).Magnitude

            const isInRange = distance < this.range
            const color = (isInRange) ? BrickColor.Green() : BrickColor.Red();
            this.sphere.BrickColor = color;
        })
    }

    onUnequip() {
        this.sphere.Parent = undefined
        this.render?.Disconnect()
    }
}

type Constraint = ReplicatedStorage["Tools"]["Shovel"]
export class ShovelItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)

        this.abilityManager.add(new ShovelClient(this));
        //Players.LocalPlayer.GetMouse().Button1Down.Connect(() => {
        //        this.invokeEvent("Swing")
        //})
    }
}