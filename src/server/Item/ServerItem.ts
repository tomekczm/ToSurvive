import { Item } from "shared/Item";
import { ReplicatedFirst, ReplicatedStorage, ServerStorage } from "@rbxts/services";
import type { Inventory } from "server/Inventory/Inventory";
//import { ModelBinder } from "./ModelBinder";

const ANIMATIONS_FOLDER = ServerStorage.Animations

export class ServerItem<T extends Instance = Instance> extends Item<T> {
    //modelBinder: ModelBinder | undefined;
    private rigid: RigidConstraint = new Instance("RigidConstraint")
    private equipAnimation: Animation | undefined;
    private equipAnimationLoaded: AnimationTrack | undefined;

    animationFolder: Instance | undefined;
    inventory: Inventory | undefined;
    equipped: boolean;
    constructor(item: T /*, modelBinder?: ModelBinder */) {
        super(item)
        this.rigid.Parent = item
        this.equipped = false;
        this.item.Parent = ReplicatedStorage
        
        this.animationFolder = ANIMATIONS_FOLDER.FindFirstChild(this.item.Name)

        this.equipAnimation = this.fetchAnimation("Hold");
        this.setQuantity(1)
    }

    getOwnership() {
        return this.inventory
    }

    setOwnership(player: Inventory) {
        this.inventory = player
        ReplicatedStorage.Events.CreateItem.FireClient(player.player, this.item.Name, this.item)
    }

    loadAnimation(animation: Animation | undefined) {
        if(!animation) return
        const animator = this.getCharacter()["Humanoid"]["Animator"]
        return animator.LoadAnimation(animation)
    }

    fetchAnimation(name: string) {
        return this.animationFolder?.FindFirstChild(name) as Animation | undefined 
    }

    animationLoad() {

    }
    
    getCharacter() {
        const owner = this.getOwnership()
        return owner?.player.Character as StarterPlayer["StarterCharacter"]
    }

    equip() {
        this.equipped = true;
        const character = this.getCharacter();
        assert(character, "Tried calling ServerItem.equip without character assigned")
        this.item.Parent = character
        const attach2 = character["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
        const animator = character["Humanoid"]["Animator"]

        if(this.equipAnimation) {
            this.equipAnimationLoaded = animator.LoadAnimation(this.equipAnimation)
            this.equipAnimationLoaded.Priority = Enum.AnimationPriority.Action2
            this.equipAnimationLoaded.Play()
        }

        const rootPart = this.item.FindFirstChild("RootPart")
        const attachment = rootPart?.FindFirstChild("Attachment") as Attachment
        this.rigid.Attachment0 = attachment
        this.rigid.Attachment1 = attach2
    }

    unequip() {
        this.equipped = false;
        this.equipAnimationLoaded?.Stop()
        this.item.Parent = this.getOwnership()?.stoarge
    }

    invokeEvent(name: string, ...args: unknown[]) {
        const owner = this.getOwnership()
        if(!owner) return
        const event = this.fetchEvent(name)
        event.FireClient(owner.player, ...args)
    }

    listenToEventRaw(name: string, cb: (player: Player, ...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnServerEvent.Connect((player, ...args) => cb(player, ...args))
    }

    listenToEvent(name: string, cb: (...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnServerEvent.Connect((player, ...args) => {
            if(player === this.getOwnership()?.player && this.equipped) {
                cb(...args)
            }
        })
    }

    setQuantity(number: number) {
        const player = this.getOwnership()?.player
        this.item.SetAttribute("Quantity", number)
        if(player) ReplicatedStorage.Events.Inventory.QuantityChanged.FireClient(player, this.item)
    }
}