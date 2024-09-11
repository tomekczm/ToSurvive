import { ReplicatedStorage, Workspace, CollectionService, Players, ServerStorage } from "@rbxts/services"
import { registerCollectableItem } from "server/Inventory/DroppedItems"
import { SwingAbility } from "./Swing"
import { SwordItem } from "server/Item/Sword"
import type { AxeItem } from "server/Item/Axe"
import type { ServerItem } from "server/Item/ServerItem"
import { Modifier } from "typescript"

const rng = new Random()

const shakeEvent = ReplicatedStorage.Events.CamShake

interface Constriant extends Model {
    RootPart: BasePart & { HitPoint: Attachment & { Sound: Sound & {
        Modifier: PitchShiftSoundEffect
    } }}
}

export class CollectAbility extends SwingAbility<ServerItem<Constriant>> {
    hitPoint = this.item.item.RootPart.HitPoint
    sound = this.hitPoint.Sound

    onSwing(): void {
        const damage = (this.item.item.GetAttribute("Damage") ?? 5) as number
        const partsInBounds = Workspace.GetPartBoundsInRadius(this.hitPoint.WorldPosition, 10)
        for(const instance of partsInBounds) {
            const parent = instance.Parent
            if(!parent) continue
            const tag = CollectionService.HasTag(parent, "Tree")
            if(!tag) continue

            const healthPoints = parent.GetAttribute("HealthPoints") as number || 10
            const startHealth = parent.GetAttribute("Health") as number
            const health = startHealth - damage

            if(healthPoints <= 0) {
                continue
            }

            parent.SetAttribute("Health", health)

            const sound = this.sound.Clone()
            sound.Parent = this.hitPoint
            sound.Modifier.Octave = rng.NextNumber(0.5, 2)
            sound.Play()

            const player = this.item.getOwnership()!.player
            shakeEvent.FireClient(player)

            sound.Ended.Once(() => {
                sound.Destroy()
            })

            if(health > 0) {
                return
            }

            parent.SetAttribute("Health", 100)
            parent.SetAttribute("HealthPoints", healthPoints - 1)

            const position = new Vector3(
                rng.NextNumber(-5 ,5),
                rng.NextNumber(10, 15), // 10
                rng.NextNumber(-5 ,5)
            ).add(this.hitPoint.WorldPosition)

            const ray = Workspace.Raycast(
                position,
                new Vector3(0,-100,0),
            )

            const params = new RaycastParams()
            params.AddToFilter(CollectionService.GetTagged("Tree"))
            params.AddToFilter(CollectionService.GetTagged("DroppedItem"))
            const players = Players.GetPlayers()

            for(const player of players) {
                if(player.Character) params.AddToFilter(player!.Character)
            }


            if(ray) {
                const woodenLog = ServerStorage.Models["Wooden Log"].Clone()
                woodenLog.Parent = Workspace
                woodenLog.SetAttribute("StartPos", this.hitPoint.WorldPosition)
                woodenLog.PivotTo(new CFrame(ray.Position))
                registerCollectableItem(
                    woodenLog,
                    () => { return new SwordItem() }
                )
            }
            
            break
        }
    }
}