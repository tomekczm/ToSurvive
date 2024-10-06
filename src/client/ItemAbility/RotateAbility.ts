import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { isInFirstPerson } from "client/FirstPersonMode";
import { ClientItem } from "client/Item/ClientItem";
import { Ability } from "shared/Ability";

const player = Players.LocalPlayer
const mouse = player.GetMouse()

let isShiftlockOn = true
let isOffsetIn = false

const tweenInfo = new TweenInfo(1)

function enableShiftlock() {
    isShiftlockOn = true
    const humanoid = Players.LocalPlayer.Character?.WaitForChild("Humanoid") as Humanoid
    assert(humanoid)
    TweenService.Create(humanoid, tweenInfo, {
        CameraOffset: new Vector3(2, 0, 0),
    }).Play()

    isOffsetIn = true

    UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
    GameSettings.RotationType = Enum.RotationType.CameraRelative
    
}


function disableShiftlock(onlyOffset = false) {
    if(!onlyOffset) {
        isShiftlockOn = false
        UserInputService.MouseBehavior = Enum.MouseBehavior.Default
        GameSettings.RotationType = Enum.RotationType.MovementRelative
    }

    isOffsetIn = false
    const humanoid = Players.LocalPlayer.Character?.WaitForChild("Humanoid") as Humanoid
    assert(humanoid)
    TweenService.Create(humanoid, tweenInfo, {
        CameraOffset: new Vector3(0, 0, 0),
    }).Play()
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

    constructor(item: ClientItem) {
        super(item);

        item.equipEvent.Connect(() => {
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
                
                if(!isShiftlockOn) {
                    const pivot = character.GetPivot()
                    const lookAt = new Vector3(mouse.Hit.X, pivot.Y, mouse.Hit.Z)
                    character.PivotTo(CFrame.lookAt(pivot.Position, lookAt))
                    
                    //const [_, y] = Workspace.CurrentCamera!.CFrame.Rotation.ToEulerAnglesYXZ();
                    //const cFrame = new CFrame(character.GetPivot().Position)
                    //const newPos = cFrame.mul(CFrame.Angles(0, y ,0))
                    //character.PivotTo(newPos)
                } else {
                    if(isInFirstPerson()) {
                        disableShiftlock(true)
                    } else if (isShiftlockOn && !isOffsetIn) {
                        enableShiftlock()
                    }
                }
            })
            
        })

        item.unequipEvent.Connect(() => {
            this.shiftLockConnection?.Disconnect()
            this.renderstepped?.Disconnect()
            disableShiftlock()
            //RunService.UnbindFromRenderStep("Rotate")
        })
    }
}