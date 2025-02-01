import { TweenService, Debris, ReplicatedStorage, RunService } from "@rbxts/services";

export function KnockbackEntity(character: Model, source: Vector3, power: number) {
    const pivot = character.PrimaryPart!.GetPivot().Position!
    const vector = source.sub(pivot).Unit.mul(-power)
    if(RunService.IsServer()) {
        character.PrimaryPart?.SetNetworkOwner(undefined)
    }
    character.PrimaryPart?.ApplyImpulse(vector)
    // do sm cool velocity so i dont get tped
    //character.PrimaryPart?.AssemblyLinearVelocity

    /*
    let passed = 0
    let event = (RunService.IsClient()) ? RunService.RenderStepped : RunService.Heartbeat
    let connection = event.Connect((dt) => {
        passed += dt / 10;
        if(passed <= 1) {
            connection.Disconnect()
        }
        const vec = vector.Lerp(new Vector3(0,0,0), passed)
        character.PrimaryPart?.ApplyImpulse(vec)
    })
        */
}

export function KnockbackPlayer(player: Player, source: Vector3, power: number) {
    ReplicatedStorage.Events.ApplyKnockback.FireClient(player, source, power)
}
