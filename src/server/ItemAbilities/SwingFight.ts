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

    onEntityDamage(entity: Entity) {
        const player = this.item.getOwnership()!.player
        entity.Damage(25);
        entity.Knockback(player.Character!.GetPivot()!.Position, 250)
        entity.controller.attackedByPlayer(player.Character)
    }

    onStart(): void {
        this.item.listenToEvent("Hit", (_humanoid) => {
            const entity = (_humanoid as Instance).Parent as Entity
            if(!entity) return
            hurtHighlight(entity)

            const player = this.item.getOwnership()?.player
            if(player && isEntity(entity) && entity.alive) {
                this.onEntityDamage(entity);
            }
        })
        super.onStart();
    }
}