import { Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { Ability } from "shared/Ability";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { ClientItem } from "client/Item/ClientItem";

const localPlayer = Players.LocalPlayer
const mouse = localPlayer.GetMouse()
const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui


export abstract class BuildAbility extends Ability<ClientItem> {
    connection: RBXScriptConnection | undefined;
    buildConnection: RBXScriptConnection | undefined;
    dragConnection: RBXScriptConnection | undefined;

    snapping = false
    offset = new CFrame()
    buildEvent = this.item.fetchEvent("Build")
    dragged: Model | undefined;
    position: CFrame | undefined;
    currentRecipe: Recipe<Item<Instance>, Model> | undefined;
    constructor(item: ClientItem) {
        super(item)
        item.equipEvent.Connect(() => this.equip())
        item.unequipEvent.Connect(() => {
            this.connection?.Disconnect()
            this.connection = undefined
            this.restart()
        })
    }

    startBuilding(instance: Model) {
        const clone = instance.Clone()
        clone.Parent = Workspace
        this.dragged = clone
        this.dragConnection = RunService.RenderStepped.Connect(() => {
            this.moveObject()
        })
    }

    restart() {
        this.dragConnection?.Disconnect()
        this.currentRecipe = undefined;
        this.offset = new CFrame()
        this.dragged?.Destroy()
    }

    moveObject() {
        if(!this.dragged) return
        const mousePos = UserInputService.GetMouseLocation();
        const params = new RaycastParams()
        params.RespectCanCollide = true
        params.AddToFilter(this.dragged)
        const character = localPlayer.Character
        if(character)
            params.AddToFilter(character)

        const camera = Workspace.CurrentCamera
        if(!camera) return

		const unitRay = camera.ScreenPointToRay(mousePos.X, mousePos.Y)
		const ray = Workspace.Raycast(unitRay.Origin, unitRay.Direction.mul(500), params)
        if(!ray) return

        for(const descendant of this.dragged.GetDescendants()) {
            if(!descendant.IsA("BasePart")) continue
            descendant.CanCollide = false
            //descendant.Color = canPlace ? new Color3(0,1,0) : new Color3(1,0,0)
        }

        if(!this.snapping) {
            this.position = new CFrame(ray.Position).mul(this.offset)
            this.dragged.PivotTo(new CFrame(ray.Position).mul(this.offset))
        } else {
            this.position = new CFrame(ray.Position, ray.Position.add(ray.Normal)).mul(this.offset)
            this.dragged.PivotTo(new CFrame(ray.Position, ray.Position.add(ray.Normal)).mul(this.offset))
        }
    }

    equip() {
        this.snapping = false
        this.connection = UserInputService.InputBegan.Connect((input) => {
            if(input.KeyCode === Enum.KeyCode.R) {
                this.offset = this.offset.mul(CFrame.Angles(0,math.rad(15),0))
            }

            if(input.KeyCode === Enum.KeyCode.T) {
                this.offset = this.offset.mul(CFrame.Angles(math.rad(15),0,0))
            }

            if(input.KeyCode === Enum.KeyCode.Z) {
                this.snapping = !this.snapping
            }
        })
    }
}