import { Debris, Players, ReplicatedStorage, RunService } from "@rbxts/services";
import { $defineCallMacros, $definePropMacros, MacroList } from "rbxts-transformer-macros";

const RNG = new Random()

export const RNG_MACROS = $defineCallMacros<Random>({
  Sample(arr: unknown[]): unknown {
    const index = (this as unknown as Random).NextInteger(1, arr.size()) // broken?
    return arr[index - 1]
  }
})

export const SOUND_MACROS = $defineCallMacros<Sound>({
  PlaySound(from: number | undefined, to: number  | undefined) {
    const clone = this.Clone() as Sound
    const modifier = new Instance("PitchShiftSoundEffect")
    if(from && to) {
        modifier.Parent = clone
        modifier.Octave = RNG.NextNumber(from, to)
    }
    clone.Parent = this.Parent
    clone.Play()
    Debris.AddItem(clone, clone.TimeLength)
  }
})
