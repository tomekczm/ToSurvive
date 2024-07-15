import { Players, ReplicatedStorage, RunService, ServerStorage, UserInputService, Workspace } from "@rbxts/services";
import { ClientItem } from "./ClientItem";
import { RotateAbility } from "client/ItemAbility/RotateAbility";
import { PointAtAbility } from "client/ItemAbility/PointAtAbility";
import { Ability } from "shared/Ability";
import { Recipe, recipes, reverseLookup } from "shared/HammerRecipes";
import { Item } from "shared/Item";

const localPlayer = Players.LocalPlayer
const mouse = localPlayer.GetMouse()
const playerGui = localPlayer.WaitForChild("PlayerGui") as PlayerGui
const buldGui = playerGui
                                    .WaitForChild("BuildGui")
                                    .WaitForChild("Background") as Frame
                    
const recipeDrag = playerGui
                    .WaitForChild("RecipeDrag")
                    .WaitForChild("background") as Frame & { Description: TextBox }

const guiRecipeLookup = new Map<GuiObject, Recipe<Item, Model>>()

const Events = ReplicatedStorage.Events.Building

/*
 const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
        clone.Parent = buldGui
        clone.Image = recipe.result.thumbnail
        _recipe.index = index
        guiRecipeLookup.set(clone, _recipe)
*/
recipes.forEach((recipe, index) => {
    const clone = ReplicatedStorage.Prefabs.Slot.Clone() as unknown as ImageLabel;
    clone.Parent = buldGui
    clone.Image = recipe.result.GetAttribute("Thumbnail") as string ?? ""
    guiRecipeLookup.set(clone, recipe)
})

function getRecipeFromInputObject(input: InputObject) {
    const { X, Y } = input.Position;
    const elements = playerGui.GetGuiObjectsAtPosition(X, Y)
    for (const element of elements) {
        const recipe = guiRecipeLookup.get(element)
        if(!recipe) continue
        return recipe
    }
    return
}

UserInputService.InputChanged.Connect((input) => {
    if(input.UserInputType !== Enum.UserInputType.MouseMovement)
        return

    const recipe = getRecipeFromInputObject(input)
    if(!recipe) return recipeDrag.Visible = false

    const { X, Y } = UserInputService.GetMouseLocation()

    recipeDrag.Visible = true
    recipeDrag.Position = UDim2.fromOffset(X, Y) 

    let text = "Requirements:\n"

    for(const requirement of recipe.requirements) {
        text += requirement.item.getName() + " x" + requirement.quantity + "\n"
    }
    recipeDrag.Description.Text = text
})



class HammerAbility extends Ability<HammerItem> {
    connection: RBXScriptConnection | undefined;
    buildConnection: RBXScriptConnection | undefined;
    dragConnection: RBXScriptConnection | undefined;

    offset = new CFrame()
    buildEvent = this.item.fetchEvent("Build")
    dragged: Model | undefined;
    position: CFrame | undefined;
    currentRecipe: Recipe<Item<Instance>, Model> | undefined;
    constructor(hammer: HammerItem) {
        super(hammer)
        hammer.equipEvent.Connect(() => this.equip())
        hammer.unequipEvent.Connect(() => {
            buldGui.Visible = false
            this.connection?.Disconnect()
            this.connection = undefined
            this.restart()
        })
    }

    restart() {
        this.dragConnection?.Disconnect()
        this.currentRecipe = undefined;
        this.offset = new CFrame()
        this.dragged?.Destroy()
    }

    moveObject(object: Model) {
        const mousePos = UserInputService.GetMouseLocation();
        const params = new RaycastParams()
        params.AddToFilter(object)
        const character = localPlayer.Character
        if(character)
            params.AddToFilter(character)

        const camera = Workspace.CurrentCamera
        if(!camera) return

		const unitRay = camera.ScreenPointToRay(mousePos.X, mousePos.Y)
		const ray = Workspace.Raycast(unitRay.Origin, unitRay.Direction.mul(500), params)
        if(!ray) return

        const pos = ray.Position
        const halfSize = 300 / 2
        const canPlace = pos.X >= -halfSize && pos.X <= halfSize &&
                                pos.Y >= -halfSize && pos.Y <= halfSize &&
                                pos.Z >= -halfSize && pos.Z <= halfSize

        for(const descendant of object.GetDescendants()) {
            if(!descendant.IsA("BasePart")) continue
            descendant.Transparency = 0.4
            descendant.Material = Enum.Material.ForceField
            //descendant.Color = canPlace ? new Color3(0,1,0) : new Color3(1,0,0)
        }
        this.position = new CFrame(ray.Position).mul(this.offset)
        object.PivotTo(new CFrame(ray.Position).mul(this.offset))
    }

    equip() {
        buldGui.Visible = true
        this.connection = UserInputService.InputBegan.Connect((input) => {
            if(input.KeyCode === Enum.KeyCode.R) {
                this.offset = this.offset.mul(CFrame.Angles(0,math.rad(15),0))
            }

            if(input.KeyCode === Enum.KeyCode.X) {
                this.restart()
            }

            if(input.UserInputType !== Enum.UserInputType.MouseButton1)
                return
        
            const recipe = getRecipeFromInputObject(input)
            if(!recipe) {
                if(this.currentRecipe)
                    this.buildEvent.FireServer(reverseLookup.get(this.currentRecipe), this.position)

                return
            }

            this.restart()

            const clone = recipe.result.Clone()

            clone.Parent = Workspace
            this.dragged = clone
            this.currentRecipe = recipe;
            this.dragConnection = RunService.RenderStepped.Connect(() => {
                this.moveObject(clone)
            })

            //this.buildEvent.FireServer(reverseLookup.get(recipe), this.position);
        })
    }
}

export class HammerItem extends ClientItem<Constraint> {
    constructor(instance: Instance) {
        super(instance as Constraint)
        this.abilityManager.add(new HammerAbility(this))
        this.abilityManager.add(new RotateAbility(this))
        this.abilityManager.add(new PointAtAbility(this, "TorsoAttach"))
    }
}