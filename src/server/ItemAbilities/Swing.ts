import { ServerItem } from "../Item/ServerItem";
import { Ability } from "../../shared/Ability";

export class SwingAbility extends Ability<ServerItem> {

    swingAnimation = this.item.fetchAnimation("Swing");
    swingAnimationLoaded: AnimationTrack | undefined;

    constructor(instance: ServerItem) {
        super(instance);
        this.item.listenToEvent("Swing", () => {
            this.swing()
        })
    }

    swing() {
        const instance = this.item.item
        const animator = this.item.getCharacter()["Humanoid"]["Animator"]

        if(instance.GetAttribute("SwingDelay")) return

        if(this.swingAnimation) {
            this.swingAnimationLoaded = animator.LoadAnimation(this.swingAnimation) 
            this.swingAnimationLoaded.Priority = Enum.AnimationPriority.Action4
            this.swingAnimationLoaded?.Play()

            instance.SetAttribute("SwingDelay", true)
            task.delay(this.swingAnimationLoaded.Length, () => {
                instance.SetAttribute("SwingDelay", false)
            })
        }
    }
}