import { ReplicatedStorage, Workspace, CollectionService, Players, ServerStorage, Debris } from "@rbxts/services"
import { registerCollectableItem } from "server/Inventory/DroppedItems"
import { SwingAbility } from "./Swing"
import { SwordItem } from "server/Item/Sword"
import type { AxeItem } from "server/Item/Axe"
import type { ServerItem } from "server/Item/ServerItem"
import { Modifier } from "typescript"
import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox"
import { hurtHighlight } from "server/VFX"
import { getEntity } from "server/Entities/Entities"

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
            const humanoid = _humanoid as Humanoid
            const parent = humanoid.Parent as StarterPlayer["StarterCharacter"]
            humanoid.TakeDamage(25)
            if(!parent || !humanoid) return
                //const vectorForce = new Instance("BodyForce")
            const humanoidRootPart = parent.HumanoidRootPart

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

            hurtHighlight(parent)
            //const root = parent.HumanoidRootPart
            //const ownerRoot = this.item.getOwnership()?.player.Character?.FindFirstChild("HumanoidRootPart") as BasePart // big ugly

            //const impulse = root.Position.sub(ownerRoot.Position).Unit.mul(this.knockback).add(new Vector3(0, this.knockback/100, 0))
            //root.ApplyImpulse(impulse)
            const entity = getEntity(parent)
            const player = this.item.getOwnership()?.player
            if(entity && humanoid.Health !== 0 && player)
                entity.attackedByPlayer(player.Character)
        })
        super.onStart();
    }
}