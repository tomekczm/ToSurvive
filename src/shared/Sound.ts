import { Debris } from "@rbxts/services"

const RNG = new Random()
export function PlaySound(sound: Sound, from: number | undefined = undefined, to: number  | undefined = undefined) {
    const clone = sound.Clone()
    const modifier = new Instance("PitchShiftSoundEffect")
    if(from && to) {
        modifier.Parent = clone
        modifier.Octave = RNG.NextNumber(from, to)
    }
    clone.Parent = sound.Parent
    clone.Play()
    Debris.AddItem(clone, clone.TimeLength)
}