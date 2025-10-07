import RaycastHitbox from "@rbxts/raycast-hitbox";
import { SwingAbility } from "./SwingAbility";
import { Players } from "@rbxts/services";
import { tiltAffectingEventHappened } from "client/UI/Tilt";
import { LocalPlayer } from "client/Character/LocalPlayer";

export class MeleeSwing extends SwingAbility {
    swingConnection!: RBXScriptConnection;
    params!: RaycastParams;

    onUnequip(): void {
        this.raycastHitbox.HitStop();
        super.onUnequip();
    }

    onStart(): void {
        const part = this.item.item.FindFirstChild("RootPart") as BasePart
        const raycastHitbox = new RaycastHitbox(part);
        this.raycastHitbox = raycastHitbox

        const character = LocalPlayer.Character;
        this.params = new RaycastParams()
        if(character)
            this.params.AddToFilter(character)
        raycastHitbox.RaycastParams = this.params;

        this.swingConnection = raycastHitbox.OnHit.Connect((part, humanoid) => {
            if(humanoid?.Health === 0) return
            this.item.invokeEvent("Hit", humanoid)
            this.raycastHitbox.HitStop()
        })
        
        super.onStart()
    }

    onNoLongerSwinging(): void {
        this.raycastHitbox.HitStop()
    }

    blockDebounce = false;
    inputBegan(input: InputObject, processed: boolean): void {
        super.inputBegan(input, processed);
        if(input.UserInputType !== Enum.UserInputType.MouseButton2)
            return

        const animation = this.item.loadAnimation(
            this.item.fetchAnimation("Block")
        )

        if(animation && !this.blockDebounce) {
            this.blockDebounce = true
            animation.Priority = Enum.AnimationPriority.Action4
            animation.Play(0.25)
            this.item.equipAnimationLoaded?.Stop(0.25)

            task.wait(0.50)
            animation.Stop(0.25)
            this.item.equipAnimationLoaded?.Play(0.25)

            task.wait(1)
            this.blockDebounce = false
        }
    }

    canSwing(): boolean {
        if(LocalPlayer.statusEffects.hasStatusEffect('LostBalance')) return false
        return super.canSwing()
    }

    localSwing(): void {
        const character = LocalPlayer.Character;
        if(character)
            this.params.AddToFilter(character)
        this.raycastHitbox.HitStart()
        tiltAffectingEventHappened("SwordSwing")
    }
}