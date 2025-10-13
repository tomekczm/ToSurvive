import { Debris, Players, ReplicatedStorage, TweenService } from "@rbxts/services";
import { tiltAffectingEventHappened } from "client/UI/Tilt";
//import { KnockbackEntity } from "shared/Knockback";
const KnockbackEvent = ReplicatedStorage.Events.ApplyKnockback

let cooldown = false;
let KNOCKBACK_COOLDOWN_LENGTH = 2;

KnockbackEvent.OnClientEvent.Connect((_source, _power) => {
    if(cooldown) return
    cooldown = true
    const source = _source as Vector3
    const power = _power as number
    const character = Players.LocalPlayer.Character!

    const pivot = character.PrimaryPart!.GetPivot().Position!
    const vector = source.sub(pivot).Unit.mul(-power)
    character.PrimaryPart?.ApplyImpulse(vector)
    tiltAffectingEventHappened("Hit")

    task.wait(KNOCKBACK_COOLDOWN_LENGTH)
    cooldown = false
})