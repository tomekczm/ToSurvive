import { ReplicatedStorage, Players, RunService } from "@rbxts/services"
import { $defineCallMacros, $definePropMacros } from "rbxts-transformer-macros"
import { entitiesMap } from "./Entities"

function KnockbackPlayer(player: Player, source: Vector3, power: number) {
    print("knocking back")
    ReplicatedStorage.Events.ApplyKnockback.FireClient(player, source, power)
  }
  
export const PLAYER_CHARACTER_MACROS = $defineCallMacros<PlayerCharacter>({
    Knockback(source: Vector3, power: number) {
        const player = Players.GetPlayerFromCharacter(this)
        assert(player, "????")
        KnockbackPlayer(player, source, power)
    }
})

function getHumanoid(model: Instance) {
    return model.FindFirstChildOfClass("Humanoid") as Humanoid
}

export const ENTITY_MACROS = $defineCallMacros<Entity>({
    Knockback(source: Vector3, power: number) {
        const model = this as Model
        const player = Players.GetPlayerFromCharacter(model)
        if (player) {
            KnockbackPlayer(player, source, power)
            return
        }
        const pivot = model.PrimaryPart!.GetPivot().Position!
        const vector = source.sub(pivot).Unit.mul(-power)
        if (RunService.IsServer()) {
            model.PrimaryPart?.SetNetworkOwner(undefined)
        }
        model.PrimaryPart?.ApplyImpulse(vector)
    },
    Damage(dmg: number): void {
        return getHumanoid(this).TakeDamage(dmg)
    }
})
