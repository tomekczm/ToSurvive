import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { Ability } from "shared/Ability";
import { Recipe } from "shared/Recipes/Recipe"
import { Item } from "shared/Item";
import { ClientItem } from "client/Item/ClientItem";
import { SetProximity } from "client/ProximityPrompts";

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
    position: CFrame | BasePart | undefined;
    currentRecipe: Recipe<Item<Instance>, Model> | undefined;

    setHiglights(mode: boolean) {
        const highlights = CollectionService.GetTagged("BuildingHighlight")
        for(const highlight of highlights) {
            if(highlight.IsA("Highlight")) {
                highlight.Enabled = mode
            }
        }
    }

    constructor(item: ClientItem) {
        super(item)
        item.equipEvent.Connect(() => this.equip())
        item.unequipEvent.Connect(() => {
            this.setHiglights(false)
            this.connection?.Disconnect()
            this.connection = undefined
            this.restart()
        })
    }

    startBuilding(instance: Model) {
        const clone = instance.Clone()
        clone.Parent = Workspace

        for(const prompt of clone.GetDescendants()) {
            if(prompt.IsA("ProximityPrompt")) SetProximity(prompt, false)
        }

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

        const IsAttachedPart = ray.Instance.Name === "BuildingAttach"
        
        const position = (IsAttachedPart) ? ray.Instance.Position : ray.Position;

        const finalPosition = (!this.snapping) ? new CFrame(position).mul(this.offset) : new CFrame(position, position.add(ray.Normal)).mul(this.offset)

        this.dragged.PivotTo(finalPosition)
        this.position = (IsAttachedPart) ? ray.Instance : finalPosition
    }

    equip() {
        this.setHiglights(true)
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