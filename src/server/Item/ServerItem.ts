import { Item } from "shared/Item";
import { ReplicatedFirst, ReplicatedStorage, ServerStorage } from "@rbxts/services";
//import { ModelBinder } from "./ModelBinder";

const ANIMATIONS_FOLDER = ServerStorage.Animations

export class ServerItem<T extends Instance = Instance> extends Item<T> {
    //modelBinder: ModelBinder | undefined;
    private rigid: RigidConstraint = new Instance("RigidConstraint")
    private equipAnimation: Animation | undefined;
    private equipAnimationLoaded: AnimationTrack | undefined;
    animationFolder: Instance | undefined;
    owner: Player | undefined;
    constructor(item: T /*, modelBinder?: ModelBinder */) {
        super(item)
        this.rigid.Parent = item
        this.item.Parent = ReplicatedStorage
        
        this.animationFolder = ANIMATIONS_FOLDER.FindFirstChild(this.item.Name)

        this.equipAnimation = this.fetchAnimation("Hold");
    }

    getOwnership() {
        return this.owner
    }

    setOwnership(player: Player) {
        this.owner = player
        ReplicatedStorage.Events.CreateItem.FireClient(player, this.item.Name, this.item)
    }

    fetchAnimation(name: string) {
        return this.animationFolder?.FindFirstChild(name) as Animation | undefined 
    }
    
    getCharacter() {
        const owner = this.getOwnership()
        return owner?.Character as StarterPlayer["StarterCharacter"]
    }

    equip() {
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
        this.equipAnimationLoaded?.Stop()
    }

    invokeEvent(name: string, ...args: unknown[]) {
        const owner = this.getOwnership()
        if(!owner) return
        const event = this.fetchEvent(name)
        event.FireClient(owner, ...args)
    }

    listenToEvent(name: string, cb: (player: Player, ...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnServerEvent.Connect((player, ...args) => cb(player, ...args))
    }
}