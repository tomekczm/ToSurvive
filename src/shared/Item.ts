import { Players, ReplicatedStorage, RunService } from "@rbxts/services";
import { AbilityManager } from "./AbilityManager";
import { Signal } from "@rbxts/beacon";

const ANIMATIONS_FOLDER = ReplicatedStorage.WaitForChild("ItemAnimations")

let player: Player | undefined = undefined
let stoarge: Instance | undefined = undefined

if(RunService.IsClient()) {
    player = Players.LocalPlayer
    stoarge = player.WaitForChild("Stoarge")
}

export class Item<T extends Instance = Instance> {
    item: T;
    abilityManager = new AbilityManager<T>(this)
    selfAttachment?: Attachment;
    animationFolder: Instance | undefined;
    equipped: boolean = false;

    equipEvent = new Signal();
    unequipEvent = new Signal();
    rigid!: RigidConstraint;

    constructor(item: T) {
        this.selfAttachment = item.FindFirstChild("RootPart")?.FindFirstChild("Attachment") as Attachment
        this.item = item
        this.animationFolder = ANIMATIONS_FOLDER.FindFirstChild(this.item.Name)
    }

    fetchEvent(name: string) {
        const events = this.item.FindFirstChild("Events")
        assert(events, "Expected an events folder")
        const event = events.FindFirstChild(name) as RemoteEvent
        assert(event, `event ${name} not found`)
        return event
    }

    getAnimation(name: string) {
        return this.loadAnimation(this.fetchAnimation(name))
    }

    loadAnimation(animation: Animation | undefined) {
        if(!animation) return
        const animator = this.getCharacter()["Humanoid"]["Animator"]
        return animator.LoadAnimation(animation)
    }

    fetchAnimation(name: string) {
        return this.animationFolder?.FindFirstChild(name) as Animation | undefined 
    }

    getInventoryFolder() {
        return stoarge
    }

    equip() {
        const character = this.getCharacter();
        assert(character, "Tried calling Item.equip without character assigned")
        this.item.Parent = character
        const attach2 = character["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
        this.rigid.Attachment0 = this.selfAttachment
        this.rigid.Attachment1 = attach2
        this.equipped = true;
        this.abilityManager.callAbilityEvent("onEquip");
        this.equipEvent.Fire(undefined);
    }

    unequip() {
        this.item.Parent = this.getInventoryFolder()
        this.equipped = false;
        this.abilityManager.callAbilityEvent("onUnequip")
        this.unequipEvent.Fire(undefined);
    }

    getCharacter() {
        return Players.LocalPlayer.Character as StarterPlayer["StarterCharacter"]
    }

    getAttribute<T>(name: string, _default?: T) {
        return (this.item.GetAttribute(name) ?? _default) as T
    }

    getName(): string {
        return (this.item.GetAttribute("Name") || this.item.Name) as string
    }

    isStackable() {
        return (this.item.GetAttribute("Stackable") ?? true) as boolean
    }

    getDescription(): string {
        return (this.item.GetAttribute("Description") || "No description found.") as string
    }

    getThumbnail(): string {
        return (this.item.GetAttribute("Image")) as string ?? "http://www.roblox.com/asset/?id=15311273253"
    }

    getQuantity(): number {
        return (this.item.GetAttribute("Quantity") ?? 1) as number
    }
    

    /*
    abstract equip(): void
    abstract preEquip(): void

    abstract preUneqip(): void
    abstract unequip(): void
    */
}