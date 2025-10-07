import { HttpService, Players } from "@rbxts/services"
import { $definePropMacros } from "rbxts-transformer-macros";
import { onStatusEffectChanged } from "./StatusEffectsDerivatives";
import { isBinding } from "@rbxts/pretty-react-hooks";
let baseWalkSpeed = 10;

export const statusEffectRecompute = new Instance("BindableEvent")

function recompute() {
    print("fired")
    statusEffectRecompute.Fire();
}

//////////////////////////////////////////////////////////////////
/* System */
/////////////////////////////////////////////////////////////////

const weights = {
    "Stunned": {
        stacks: false,
    },
    "LostBalance": {
        stacks: false,
    }
}

type WeightKey = keyof typeof weights;

interface MetaWeightEntry {
    count: number;
    invalidators: Set<() => void>;
}

type MetaWeights = Record<WeightKey, MetaWeightEntry>;

const metaWeights = (() => {
    const newWeights: Record<any, any> = {};
    for (const [key, _] of pairs(weights)) {
        newWeights[key as string] = {
            count: 0,
            invalidators: new Set(),
        };
    }
    return newWeights as MetaWeights
})()

function getStatusEffect(key: keyof typeof weights) {
    return metaWeights[key].count
}

function hasStatusEffect(key: keyof typeof weights) {
    return getStatusEffect(key) > 0
}

function clearStatusEffect(key: keyof typeof weights) {
    metaWeights[key].invalidators.forEach((invalidator) => {
        invalidator()
    })
}

function addStatusEffect(key: keyof typeof weights) {
    metaWeights[key].count++;

    let invalidated = false

    function invalidate() {
        if(invalidated) return false;
        invalidated = true;
        metaWeights[key].count--;
        metaWeights[key].invalidators.delete(invalidate)
        recompute()
        return true
    }

    metaWeights[key].invalidators.add(invalidate)

    recompute()
    return invalidate
}

function setBaseSpeed(baseSpeed: number) {
    baseWalkSpeed = baseSpeed
    recompute()
}

function getBaseSpeed() {
    return baseWalkSpeed;
}

/**
 * @deprecated internal use only (@internal dosen't stop it being recommended by intelisense)
 */
export const statusEffects = {
    getBaseSpeed,
    setBaseSpeed,
    addStatusEffect,
    clearStatusEffect,
    hasStatusEffect
}

export const LOCAL_PLAYER_MACROS = $definePropMacros<LocalPlayer>({
    inFirstPerson() {
      const localPlayer = Players.LocalPlayer
      const head = localPlayer.Character?.WaitForChild("Head") as Part
      return head.LocalTransparencyModifier === 1
    },
    statusEffects() {
      return statusEffects;
    }
  })