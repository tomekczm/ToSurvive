import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox"
import type { Zombie } from "../Zombie"
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services"
import { hurtHighlight } from "server/VFX"
import { sample } from "shared/Array"
import { damageFlag } from "server/Flag"
import { IZombieWeapon } from "./IZombieWeapon"

const Animations = ReplicatedStorage.Animations.Zombie

const KICK = Animations.Kick.GetChildren()
const PUNCH = Animations.Punch.GetChildren()

export class MeleeWeapon implements IZombieWeapon {
    item: Instance
    rigidConstraint?: RigidConstraint
    hitbox: HitboxObject
    animations: AnimationTrack[] = []
    constructor(private zombie: Zombie, private weapon: Instance, skipWeld = false) {
        this.item = weapon
        if(weapon !== zombie.model) {
            if(!skipWeld) {
                const rigid = new Instance("RigidConstraint")
                const attach2 = zombie.model["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
                rigid.Attachment0 = this.item.FindFirstChild("RootPart")?.FindFirstChild("Attachment") as Attachment
                rigid.Attachment1 = attach2
                rigid.Parent = this.item
                this.item.Parent = zombie.model
                this.rigidConstraint = rigid
            }
            this.initAnimations()
        } else {
            this.initDefaultAnimations()
        }

        this.hitbox = new RaycastHitbox(weapon)
        this.hitbox.OnHit.Connect((_, humanoid) => {
            const player = Players.GetPlayerFromCharacter(zombie.target)
            if (humanoid === zombie.model.Humanoid) return
            if (player) {
                ReplicatedStorage.Events.CamShake.FireClient(player)
            }
            if (humanoid && zombie.target) {
                humanoid.TakeDamage(10)
            }
            if (zombie.target) {
                hurtHighlight(zombie.target)
            }
        })
    }
    
    stateUpdated(state: string): void {}

    private initDefaultAnimations() {
        this.loadAnimations(KICK)
        this.loadAnimations(PUNCH)
    }

    private initAnimations() {
        const anims = ReplicatedStorage.ItemAnimations.FindFirstChild(this.item.Name)
        const swings = [anims!.FindFirstChild("Swing"), anims!.FindFirstChild("Swing2")] as Instance[]
        this.loadAnimations(swings)

        const idle = anims!.FindFirstChild("Hold") as Animation
        const humanoid = this.zombie.model.Humanoid.Animator
        if (idle) {
            const priority = humanoid.LoadAnimation(idle)
            priority.Priority = Enum.AnimationPriority.Action2
            priority.Play()
        }
    }

    private loadAnimations(instance: Instance[]) {
        const humanoid = this.zombie.model.Humanoid.Animator
        instance.forEach((animation) => {
            if (!animation.IsA("Animation")) return
            const loaded = humanoid.LoadAnimation(animation)
            loaded.Priority = Enum.AnimationPriority.Action3
            this.animations.push(loaded)
        })
    }

    attackPlayer() {
        const zombie = this.zombie
        const distance = zombie.getDistanceTo()
        if(distance > 5 || !zombie.canAttack) {
            return
        }
        zombie.canAttack = false;
        const animation = sample(this.animations)
        this.hitbox.HitStart(animation.Length);
        this.hitbox.Visualizer = true
        animation.Play()
        animation.Looped = false
        animation.Ended.Once(() => {
            zombie.canAttack = true
        })
    }

    attackFlag() {
        const animation = sample(this.animations)
        animation.Play()
        animation.Ended.Once(() => {
            this.zombie.canAttack = true
        })
        damageFlag(10);
        hurtHighlight(Workspace.Flag)
    }
}