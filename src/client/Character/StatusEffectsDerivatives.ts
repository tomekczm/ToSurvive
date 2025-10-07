import { LocalPlayer } from "./LocalPlayer";
import { statusEffectRecompute } from "./StatusEffectsCompute";

const statusEffects = LocalPlayer.statusEffects;

function recomputeWalkSpeed() {
    let speed = statusEffects.getBaseSpeed();

    if(statusEffects.hasStatusEffect("Stunned")) {
        return 0;
    }

    if(statusEffects.hasStatusEffect("LostBalance")) {
        return 0.5;
    }

    return speed;
}



export function onStatusEffectChanged() {
    const humanoid = LocalPlayer.character?.Humanoid
    if(!humanoid) return;
    humanoid.WalkSpeed = recomputeWalkSpeed();
}
statusEffectRecompute.Event.Connect(onStatusEffectChanged)