import { Signal } from "@rbxts/beacon"
import { Item } from "shared/Item"

export class ClientItem<T extends Instance = Instance> extends Item<T> {
    equipAnimation?: Animation;
    equipAnimationLoaded?: AnimationTrack;

    constructor(item: Instance) {
        super(item as T);
        this.equipAnimation = this.fetchAnimation("Hold");
        this.rigid = this.item.FindFirstChildWhichIsA("RigidConstraint") as RigidConstraint
        assert(this.rigid)
    }

    equip(): void {
        const character = this.getCharacter();
        const animator = character["Humanoid"]["Animator"]
        if(this.equipAnimation) {
            this.equipAnimationLoaded = animator.LoadAnimation(this.equipAnimation)
            this.equipAnimationLoaded.Priority = Enum.AnimationPriority.Action2
            this.equipAnimationLoaded.Play()
        }
        super.equip()
    }

    unequip() {
        this.equipAnimationLoaded?.Stop()
        super.unequip()
    }

    getPosition() {
        if(this.selfAttachment === undefined) {
            throw error("Attachment not found")
        }
        return this.selfAttachment.WorldPosition;
    }

    invokeEvent(name: string, ...args: unknown[]) {
        const event = this.fetchEvent(name)
        event.FireServer(...args)
    }

    listenToEvent(name: string, cb: (...args: unknown[]) => void) {
        const event = this.fetchEvent(name)
        event.OnClientEvent.Connect((...args: unknown[]) => cb(...args))
    }
}