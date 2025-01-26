import { CollectionService, Players, RunService, ServerStorage, SoundService, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { SwingAbility } from "client/ItemAbility/SwingAbility";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { hurtHighlight } from "shared/VFX";
import { ImpulseProximity } from "client/ProximityPrompts";
import { openChest } from "client/VFX/ChestMenu";
import { PlaySound } from "shared/Sound";

const mouse = Players.LocalPlayer.GetMouse()
const DigSoundEffect = SoundService.SoundGroup.Dig

const WORLD_HEIGHT = 90;

let chestOpened = false

const soundsForOre = new Map<string, Sound>()
soundsForOre.set("Coal", SoundService.SoundGroup.OreDig)
soundsForOre.set("Treasure", SoundService.SoundGroup.WoodChestHit)

// A lot of functions are not verified on server please dont forget to fix these when releasing
// Im too lazy to do it rn
// Generally in game not only here
class ShovelClient extends SwingAbility {
    allowedMaterials = new Set<Enum.Material>();
    sphere!: Part
    render: RBXScriptConnection | undefined
    range = this.item.getAttribute("Range", 20)
    digSize = this.item.getAttribute("DigSize", 2)

    addMaterial(material: Enum.Material) {
        this.allowedMaterials.add(material)
        return this
    }

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
        const mouseHit = this.getMouseHit()
        if(!mouseHit) return

        const instance = mouseHit.Instance
        const model = instance.FindFirstAncestorOfClass("Model");

        if(model && CollectionService.HasTag(model, "Ore")) {
            if(model.Name === "Treasure" && !chestOpened) {
                warn("Dont leave this in")
                chestOpened = true
                task.spawn(async () => {
                    openChest()
                    const { unequipCurrentItem } = await import("client/Inventory/Inventory");
                    unequipCurrentItem()
                })
            }
            const sound = soundsForOre.get(model.Name)
            if(sound) 
                PlaySound(sound, 0.75, 1.25)
            ImpulseProximity()
            return;
        }

        if(!this.allowedMaterials.has(mouseHit.Material) || !this.isInWorldBounds(mouseHit.Position)) return;
        PlaySound(DigSoundEffect, 0.75, 1.25)
        this.item.invokeEvent("Dig", mouseHit.Position)
        super.localSwing();
    }
    
    getMouseHit() {
        const camera = Workspace!.CurrentCamera!
        const mousePos = Players.LocalPlayer.GetMouse()
        const unitRay = camera.ScreenPointToRay(mousePos.X, mousePos.Y)

        const params = new RaycastParams()
        params.AddToFilter(this.sphere)

        const character = Players.LocalPlayer.Character
        if(character)
            params.AddToFilter(character)

        const raycast = Workspace.Raycast(
            unitRay.Origin,
            unitRay.Direction.mul(1000),
            params
        )
        
        return raycast
    }

    isInWorldBounds(position: Vector3) {
        const DIG_PEREMITER = this.digSize / 2
        return position.Y > -(WORLD_HEIGHT - DIG_PEREMITER)
    }

    onEquip() {
        this.render = RunService.RenderStepped.Connect((dt) => {
            const raycast = this.getMouseHit()
            if(!raycast) return
            const ballPosition = raycast.Position
            const rayMaterial = raycast.Material
            const instance = raycast.Instance
            const model = instance.FindFirstAncestorOfClass("Model");
            if(model && CollectionService.HasTag(model, "Ore") || 
                !this.isInWorldBounds(ballPosition)) {
                this.sphere.Parent = undefined;
                return;
            }

            this.sphere.Parent = Workspace
            this.sphere.Position = ballPosition
            
            const itemPosition = this.item.getPosition()
            const distance = itemPosition.sub(ballPosition).Magnitude

            const isAllowedMaterial = this.allowedMaterials.has(rayMaterial)
            const isInRange = distance < this.range
            const color = (isInRange && isAllowedMaterial) ? BrickColor.Green() : BrickColor.Red();
            this.sphere.BrickColor = color;
        })
        super.onEquip()
    }

    onUnequip() {
        this.sphere.Parent = undefined
        this.render?.Disconnect()
        super.onUnequip()
    }
}

type Constraint = ReplicatedStorage["Tools"]["Shovel"]
export class ShovelItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)

        this.abilityManager.add(new ShovelClient(this)
                                    .addMaterial(Enum.Material.Grass)
                                    .addMaterial(Enum.Material.Rock));
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
    }
}