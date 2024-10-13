import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { Ability } from "../../shared/Ability";
import { SwingAbility } from "../ItemAbilities/Swing";
import { SwingFight } from "server/ItemAbilities/SwingFight";
import { Projectile } from "server/Entities/Projectile";

const PROJECTILE = ServerStorage.Models.Spear

type Constraint = ReplicatedStorage["Tools"]["Spear"]
export class SpearItem extends ServerItem<Constraint> {
    throwAnimation: AnimationTrack | undefined;

    throwStop() {
        this.throwAnimation?.Stop(1)
    }

    throw(origin: Vector3, direction: CFrame) {
        const pivot = this.item.GetPivot()
        this.consumeItem()
        new Projectile(PROJECTILE, new CFrame(origin, direction.Position), this.getOwnership()?.player.Character)
    }

    constructor() {
        super(ReplicatedStorage.Tools.Spear.Clone())

        this.listenToEvent("PrepareThrow", () => {
            if(this.throwAnimation) {
                this.throwAnimation.Stop()
            }
            this.throwAnimation = this.getAnimation("PrepareThrow")
            this.throwAnimation?.Play(1)
        })

        this.listenToEvent("ThrowStop", () => {
            this.throwStop()
        })

        this.listenToEvent("Throw", (origin, direction) => {
            this.throw(origin as Vector3, direction as CFrame)
        })

        this.abilityManager.add(new SwingFight(this))
    }

    unequip(): void {
        this.throwAnimation?.Stop()
        this.throwStop()
        super.unequip()
    }
}