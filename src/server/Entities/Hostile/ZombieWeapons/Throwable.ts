import { ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { Zombie } from "../Zombie";
import { IZombieWeapon } from "./IZombieWeapon";
import { MeleeWeapon } from "./Melee";
import { Projectile } from "../../Passive/Projectile";

export class ThrowableBuilder {
    meleeSecondary: boolean = false;
    reloadTime: number = 5;
    constructor() {}

    setAsMeleeSecondary(value: boolean) {
        this.meleeSecondary = value;
        return this;
    }

    setReloadTime(value: number) {
        this.reloadTime = value;
        return this;
    }
}

let meleeRange = 5;

export class Throwable implements IZombieWeapon {

    meleeSecondary: MeleeWeapon;
    prepareThrow: AnimationTrack | undefined;
    thrownAwayOnUse: boolean;
    handMelee: MeleeWeapon | undefined;

    cookingTime = 0;
    isThrown = false;
    //throw: AnimationTrack | undefined;

    constructor(private zombie: Zombie, private model: Model, thrownAwayOnUse: boolean = false) {

        if(thrownAwayOnUse) {
            this.handMelee = new MeleeWeapon(zombie, zombie.model)
        }

        this.thrownAwayOnUse = thrownAwayOnUse;

        const animFolder = ReplicatedStorage.ItemAnimations.FindFirstChild(model.Name)
        
        const humanoid = zombie.model.Humanoid.Animator

        const prepareThrow = animFolder?.FindFirstChild("PrepareThrow") as Animation;
        const throwAnim = animFolder?.FindFirstChild("Throw") as Animation;
        this.prepareThrow = humanoid.LoadAnimation(prepareThrow)
        this.prepareThrow.Priority = Enum.AnimationPriority.Action3
        this.meleeSecondary = new MeleeWeapon(zombie, model)
    }

    stateUpdated(state: string): void {
        if(state === "defaultState" || state === "attackBuildingState") {
            this.prepareThrow?.Stop()
        }
    }
    

    throwAway() {
        this.model.Parent = ServerStorage
        this.isThrown = true
        const pivot = this.model.GetPivot().Position
        const player = this.zombie.target.GetPivot().Position
        const position = new CFrame(pivot, player)
        new Projectile(ServerStorage.Models.Spear.Clone(), position, this.zombie.model).setCanBeCollected(false)
        task.delay(3, () => {
            this.model.Parent = this.zombie.model
            this.isThrown = false;
        })
    }

    attackBuilding(): void {
        if(this.isThrown) {
            return this.handMelee?.attackBuilding()
       }
        return this.meleeSecondary.attackBuilding();
    }

    attackPlayer(dt: number): void {
       const distance = this.zombie.getDistanceTo()

       const isInRange = distance > meleeRange

       if(!isInRange || this.isThrown) {
            this.cookingTime = 0;
            this.prepareThrow?.Stop()
       }

       if(this.isThrown) {
            return this.handMelee?.attackPlayer()
       }

       if(!isInRange) {
            return this.meleeSecondary.attackPlayer();
       }

       this.cookingTime += dt;
       if(this.zombie.canAttack) {
            if(!this.prepareThrow?.IsPlaying) {
                this.prepareThrow?.Play()
            }
            
            if(this.cookingTime >= 5) {
                if(this.thrownAwayOnUse) {
                    this.throwAway()
                }
            }
       }
    }

    attackFlag(): void {
        this.prepareThrow?.Stop()
        this.meleeSecondary.attackFlag()
    }
}