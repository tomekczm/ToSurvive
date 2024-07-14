import { CollectionService, Players, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "server/ItemAbilities/Swing";
import { registerCollectableItem } from "server/Inventory/DroppedItems";
import { SwordItem } from "./Sword";

const rng = new Random()

class AxeAbility extends SwingAbility<AxeItem> {
    hitPoint = this.item.item.RootPart.HitPoint
    sound = this.hitPoint.Sound

    onSwing(): void {
        const partsInBounds = Workspace.GetPartBoundsInRadius(this.hitPoint.WorldPosition, 10)
        for(const instance of partsInBounds) {
            const parent = instance.Parent
            if(!parent) continue
            const tag = CollectionService.HasTag(parent, "Tree")
            if(!tag) continue

            const sound = this.sound.Clone()
            sound.Parent = this.hitPoint
            sound.Modifier.Octave = rng.NextNumber(0.5, 2)
            sound.Play()
            sound.Ended.Once(() => {
                sound.Destroy()
            })

            const position = new Vector3(
                rng.NextNumber(-5 ,5),
                10,
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

type Constraint = ReplicatedStorage["Tools"]["Axe"]
export class AxeItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Axe.Clone())
        this.abilityManager.add(new AxeAbility(this));
    }
}