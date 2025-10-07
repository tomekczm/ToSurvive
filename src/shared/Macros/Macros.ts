import { Debris, Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
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

export const ARRAY_MACROS = $defineCallMacros<Array<any>>({
  Sample() {
    const arr = this as unknown as Array<unknown>
    let index = math.random(1, arr.size())
	  return arr[index - 1];
  },
  SamplePop<T extends defined>() {
    const arr = this as unknown as Array<T>
    let index = math.random(1, arr.size())
    const value = arr[index - 1];
    arr.remove(index - 1);
	  return value;
  }
}) 

function emptyParams() {
  const params = new RaycastParams()
  params.AddToFilter(Players.LocalPlayer.character!);
  return params;
}

export const MOUSE_MACROS = $defineCallMacros<Mouse>({
  GetTarget(params?: RaycastParams) {
    params = params ?? emptyParams();
    const mouse = this as Mouse
    const camera = Workspace.CurrentCamera
    assert(camera)
    const mouseX = mouse.X
    const mouseY = mouse.Y
    const imaginaryRay = camera.ScreenPointToRay(mouseX, mouseY);
    return Workspace.Raycast(
      imaginaryRay.Origin,
      imaginaryRay.Direction.mul(1000),
      params
    ) ?? {}
  }
})