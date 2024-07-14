import { ServerItem } from "../Item/ServerItem";
import { Ability } from "../../shared/Ability";
import { sample } from "shared/Array";

export class SwingAbility<T extends ServerItem> extends Ability<T> {

    animations = [
        this.item.fetchAnimation("Swing") as Animation,
        this.item.fetchAnimation("Swing2") as Animation
    ]

    firstPlayed: boolean = false
    swingAnimationLoaded: AnimationTrack | undefined;

    onStart(): void {
        this.item.listenToEvent("Swing", () => {
            this.swing()
        })
    }


    scanNearby() {
        const item = this.item.item
        const point = item
    }

    onSwing() {}

    swing() {
        const instance = this.item.item
        const animator = this.item.getCharacter()["Humanoid"]["Animator"]

        if(instance.GetAttribute("SwingDelay")) return

        this.swingAnimationLoaded = animator.LoadAnimation(
            this.animations[(this.firstPlayed) ? 0 : 1]
        ) 

        this.swingAnimationLoaded.Priority = Enum.AnimationPriority.Action4
        this.swingAnimationLoaded?.Play(0.25)

        this.swingAnimationLoaded.GetMarkerReachedSignal("Impact").Once(() => {
            this.onSwing()
        })

        instance.SetAttribute("SwingDelay", true)
        task.delay(this.swingAnimationLoaded.Length, () => {
            this.firstPlayed = !this.firstPlayed
            instance.SetAttribute("SwingDelay", false)
        })
        
    }
}