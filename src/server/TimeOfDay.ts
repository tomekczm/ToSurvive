/*
import { Lighting, TweenService, Workspace } from "@rbxts/services"

const time = new Instance("NumberValue")
time.Parent = script
time.Changed.Connect((newTime) => {
    Lighting.SetMinutesAfterMidnight(newTime)
})

const dayCycle = TweenService.Create(
	time,
	new TweenInfo(40,Enum.EasingStyle.Linear,Enum.EasingDirection.In),
	{
		Value: 60 * 12
	}
)

const nightCycle = TweenService.Create(
	time,
	new TweenInfo(40,Enum.EasingStyle.Linear,Enum.EasingDirection.In),
	{
		Value: 60 * 24
	}
)

let night = 0;
let day = 0;

task.spawn(() => {
    while(true) {
        print("DAY")
        day++;

        Workspace.SetAttribute("DateName", "Day " + day)

        dayCycle.Play()
        dayCycle.Completed.Wait()
        print("NIGHT")
        night++;

        Workspace.SetAttribute("DateName", "Night " + night)
        nightCycle.Play()
        nightCycle.Completed.Wait()
    }
})
*/