import { isEntity } from "server/Entities/Base/Entities";
import { SwingFight } from "./SwingFight";
import { CollectionService, Workspace } from "@rbxts/services";

class RangeSwordAttack extends SwingFight {
    onEntityDamage(entity: Entity): void {
        super.onEntityDamage(entity)
        const overlapParams = new OverlapParams()
        overlapParams.FilterType = Enum.RaycastFilterType.Include
        overlapParams.AddToFilter(
            CollectionService.GetTagged("Zombie")
        )


        const zombies = Workspace.GetPartBoundsInRadius(
            entity.GetPivot().Position,
            20, overlapParams
        )

        const zombieList = new Set()

        for (const zombiePart of zombies) {
            const zombie = zombiePart.Parent
            if (!zombie) continue
            if (zombie === entity) continue
            if (zombieList.has(zombie)) continue
            if (!isEntity(zombie)) continue

            zombieList.add(zombie)
            //zombie.controller.attackedByPlayer(player.Character)
            zombie.Knockback(entity.GetPivot().Position, 1000)
            zombie.Damage(25);
        }

    }
}