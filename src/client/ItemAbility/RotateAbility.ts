import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { isInFirstPerson } from "client/FirstPersonMode";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";
import { InputBeganEvent } from "./EventInterfaces";

const shiftlock = Players.LocalPlayer.WaitForChild("PlayerScripts").WaitForChild("PlayerModule").WaitForChild("Shift_Lock") as BindableEvent
const player = Players.LocalPlayer
const mouse = player.GetMouse()

let isShiftlockOn = false
let isOffsetIn = false


const value = new Instance("Vector3Value")

value.Changed.Connect(() => {
    currentShiftlock = value.Value
    if(value.Value.Magnitude === 0) {
        shiftlock.Fire(false)
        return
    }
    shiftlock.Fire(true, value.Value)
})

let currentShiftlock: Vector3 = new Vector3(0,0,0)
export function setShiftlock(vector: Vector3 = new Vector3(0,0,0), tweenInfo?: TweenInfo) {
    value.Value = currentShiftlock
    const magnitude = vector.sub(currentShiftlock).Magnitude / 10
    tweenInfo = tweenInfo || new TweenInfo(magnitude, Enum.EasingStyle.Quad, 
	Enum.EasingDirection.InOut) 
    const tween = TweenService.Create(value, tweenInfo, {
        Value: vector,
    })
    tween.Play()
}

function resetShiftlock() {
    currentShiftlock = new Vector3(0,0,0)
    shiftlock.Fire(false)
}

function enableShiftlock() {
    if(isShiftlockOn) {
        return
    }
    isShiftlockOn = true
    setShiftlock(new Vector3(2,0,0))

    /*
    tweenConnection?.Cancel();
    tweenConnection = tween
    tween.Completed.Once((state) => {
        if(state === Enum.PlaybackState.Cancelled) return
        humanoid.CameraOffset = new Vector3(0,0,0)
        shiftlock.Fire(true, new Vector3(2,0,0))
    })
        */
    isOffsetIn = true
    //GameSettings.RotationType = Enum.RotationType.CameraRelative
}

function disableShiftlock(onlyOffset = false) {
    if(!onlyOffset) {
        isShiftlockOn = false
    }
    isOffsetIn = false
    setShiftlock(new Vector3(0,0,0))
}

interface UserSettings {
    GameSettings: {
        RotationType: unknown 
    }
}

const GameSettings = (UserSettings() as unknown as UserSettings).GameSettings

export class RotateAbility extends Ability<ClientItem> implements InputBeganEvent {

    event: RBXScriptConnection | undefined
    shiftLockConnection: RBXScriptConnection | undefined

    constructor(item: ClientItem, offset = new Vector3(2,0,0)) {
        super(item);
    }
    inputBegan(input: InputObject): void {
        if(input.KeyCode !== Enum.KeyCode.Q) return

        if(isShiftlockOn) disableShiftlock() 
        else enableShiftlock()
    }

    onUnequip() {
        disableShiftlock()
    }

    onEquip() {
        enableShiftlock()
    }
}