import { TweenService, Workspace } from "@rbxts/services";

const flag = Workspace.Flag
const value = new Instance("IntValue")
value.Value = 1

let oldHealth = flag.GetAttribute("Health") as number ?? 100
let tween: Tween | undefined

const MAX_HEALTH = 100

flag.GetAttributeChangedSignal("Health").Connect(() => {
    const health = flag.GetAttribute("Health") as number
    onChange(health / MAX_HEALTH)
    /*
    const difference = math.abs(health - oldHealth)

    tween?.Cancel()
    tween = TweenService.Create(value, new TweenInfo(1), {
        Value: health
    })
    tween.Play()
    oldHealth = health*/
})



const fadeDistance = 0.0125
function onChange(_value: number) {
    const invertedValue = 1 - (_value);
    // Calculate clamped keypoints for the NumberSequence
    const clampedLow = math.clamp(invertedValue - fadeDistance, 0, 1);
    const clampedHigh = math.clamp(invertedValue + fadeDistance, 0, 1);
    // Construct the NumberSequence
    const transparencySequence = new NumberSequence([
        new NumberSequenceKeypoint(0, 1),
        new NumberSequenceKeypoint(clampedLow, 1),  
        new NumberSequenceKeypoint(clampedHigh, 0),  
        new NumberSequenceKeypoint(1, 0)
    ]);

    flag.Flag.Transparency = transparencySequence
}

/*
task.spawn(() => {
    let health = 100
    while(true) {
        onChange(health)
        task.wait(10)
        health -= 10
    }
})
    */