import { ReplicatedStorage, Workspace, CollectionService, Players, ServerStorage, Debris } from "@rbxts/services"
import { registerCollectableItem } from "server/Inventory/DroppedItems"
import { SwingAbility } from "./Swing"
import { SwordItem } from "server/Item/Sword"
import type { AxeItem } from "server/Item/Axe"
import type { ServerItem } from "server/Item/ServerItem"
import { Modifier } from "typescript"
import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox"
import { hurtHighlight } from "shared/VFX"
import { isEntity } from "server/Entities/Base/Entities"
const rng = new Random()

const shakeEvent = ReplicatedStorage.Events.CamShake

interface Constriant extends Model {
    RootPart: BasePart
}

export class SwingFight extends SwingAbility<ServerItem<Constriant>> {
    knockback: number
    constructor(item: ServerItem<Constriant>, knockback = 2500) {
        super(item)
        this.knockback = knockback;
    }

    onStart(): void {
        this.item.listenToEvent("Hit", (_humanoid) => {
            const entity = (_humanoid as Instance).Parent as StarterPlayer["StarterCharacter"]
            if(!entity) return
                //const vectorForce = new Instance("BodyForce")

                //                humanoidRootPart.ApplyImpulse(humanoidRootPart.CFrame.LookVector.mul(-100).add(new Vector3(0, 1000, 0)))

                //const otherForce = humanoidRootPart.FindFirstChild("BodyForce")
                //otherForce?.Destroy()

                //const attachment = humanoidRootPart["mixamorig:Hips"]
                //vectorForce.Parent = humanoidRootPart
                //vectorForce.ApplyAtCenterOfMass = true
                //vectorForce.Attachment0 = attachment
                //vectorForce.RelativeTo = Enum.ActuatorRelativeTo.World
                //const character = this.item.getCharacter().GetPivot().Position
                //const zombie = parent.GetPivot().Position;
                //const direction = character.sub(zombie).Unit
                //vectorForce.Force = humanoidRootPart.CFrame.LookVector.mul(-10000)

                //Debris.AddItem(vectorForce, 0.05)

            hurtHighlight(entity)

            const player = this.item.getOwnership()?.player
            print("")
            if(isEntity(entity) && entity.alive && player) {
                entity.Damage(25);
                entity.Knockback(player.Character!.GetPivot()!.Position, 250)
                entity.controller.attackedByPlayer(player.Character)
            }
        })
        super.onStart();
    }
}