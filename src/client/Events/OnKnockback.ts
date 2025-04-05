import { Debris, Players, ReplicatedStorage, TweenService } from "@rbxts/services";
//import { KnockbackEntity } from "shared/Knockback";
const KnockbackEvent = ReplicatedStorage.Events.ApplyKnockback

KnockbackEvent.OnClientEvent.Connect((_source, _power) => {
    const source = _source as Vector3
    const power = _power as number
    const character = Players.LocalPlayer.Character!
    //KnockbackEntity(character, source, power)

})