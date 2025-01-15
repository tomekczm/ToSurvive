import RaycastHitbox from "@rbxts/raycast-hitbox";
import { SwingAbility } from "./SwingAbility";
import { Players } from "@rbxts/services";

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

        const character = Players.LocalPlayer.Character;
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

    localSwing(): void {
        const character = Players.LocalPlayer.Character;
        if(character)
            this.params.AddToFilter(character)
        this.raycastHitbox.HitStart()
    }
}