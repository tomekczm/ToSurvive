import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { isInFirstPerson } from "client/FirstPersonMode";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const shiftlock = Players.LocalPlayer.WaitForChild("PlayerScripts").WaitForChild("PlayerModule").WaitForChild("Shift_Lock") as BindableEvent
const player = Players.LocalPlayer
const mouse = player.GetMouse()

let isShiftlockOn = false
let isOffsetIn = false
let tweenConnection: Tween | undefined


const value = new Instance("Vector3Value")
let mouseUpdate: RBXScriptConnection | undefined

value.Changed.Connect(() => {
    currentShiftlock = value.Value
    if(value.Value.Magnitude === 0)  {
        mouseUpdate?.Disconnect()
        return
    }
    shiftlock.Fire(true, value.Value)
})

let currentShiftlock: Vector3 = new Vector3(0,0,0)
function setShiftlock(vector: Vector3 = new Vector3(0,0,0)) {
    mouseUpdate?.Disconnect()
    value.Value = currentShiftlock
    const magnitude = vector.sub(currentShiftlock).Magnitude / 2
    const tweenInfo = new TweenInfo(magnitude)
    const tween = TweenService.Create(value, tweenInfo, {
        Value: vector,
    })
    tween.Play()
    if(vector.Magnitude === 0) {
        mouseUpdate = RunService.RenderStepped.Connect(() => {
            UserInputService.MouseBehavior = Enum.MouseBehavior.Default
            GameSettings.RotationType = Enum.RotationType.MovementRelative
        })
    }
}

function resetShiftlock() {
    currentShiftlock = new Vector3(0,0,0)
    shiftlock.Fire(false)
}

function enableShiftlock() {
    UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
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
        UserInputService.MouseBehavior = Enum.MouseBehavior.Default
        GameSettings.RotationType = Enum.RotationType.MovementRelative
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

export class RotateAbility extends Ability<ClientItem> {

    event: RBXScriptConnection | undefined
    shiftLockConnection: RBXScriptConnection | undefined
    renderstepped: RBXScriptConnection | undefined;

    constructor(item: ClientItem, offset = new Vector3(2,0,0)) {
        super(item);
    }

    onUnequip() {
        this.shiftLockConnection?.Disconnect()
        this.renderstepped?.Disconnect()
        disableShiftlock()
    }

    onEquip() {
        enableShiftlock()
        this.shiftLockConnection = UserInputService.InputBegan.Connect((object) => {
            if(object.KeyCode !== Enum.KeyCode.Q) return

            if(isShiftlockOn) disableShiftlock() 
            else enableShiftlock()
        })

        this.renderstepped = RunService.RenderStepped.Connect(() => {
            const character = player.Character
            const humanoid = character?.FindFirstChild("Humanoid") as Humanoid
            if(!character) return

            if(isInFirstPerson()) {
                disableShiftlock(true)
            } else if (isShiftlockOn && !isOffsetIn) {
                enableShiftlock()
            }
            /*
            if(!isShiftlockOn) {
                const pivot = character.GetPivot()
                const lookAt = new Vector3(mouse.Hit.X, pivot.Y, mouse.Hit.Z)
                character.PivotTo(CFrame.lookAt(pivot.Position, lookAt))
                
                //const [_, y] = Workspace.CurrentCamera!.CFrame.Rotation.ToEulerAnglesYXZ();
                //const cFrame = new CFrame(character.GetPivot().Position)
                //const newPos = cFrame.mul(CFrame.Angles(0, y ,0))
                //character.PivotTo(newPos)
            } else {
            
            }
            */
        })
    }
}