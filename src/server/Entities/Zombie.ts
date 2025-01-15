import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { damageFlag, getFlagHealth } from "server/Flag";
import { hurtHighlight } from "server/VFX";
import { sample } from "shared/Array";
import { addEntity } from "./Entities";
import { Soul } from "./Soul";
import { Janitor } from "@rbxts/janitor";
import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox";

const Animations = ReplicatedStorage.Animations.Zombie
const model = ServerStorage.Models.ZombieModel

const WAKE_UP = Animations.StandUp
const IDLE = Animations.Idle
const WALK = Animations.Walk

const flag = Workspace.Flag

const KICK = Animations.Kick.GetChildren()
const PUNCH = Animations.Punch.GetChildren()

const entities: Zombie[] = []

const ATTACK_LENGTH = 5;
const Ragdoll = ServerStorage.Models.Ragdoll.Clone()

CollectionService.GetInstanceAddedSignal("Zombie").Connect((_model) => {
    const model = _model as Model;
    for(const child of model.GetChildren()) {
        if(!child.IsA("BasePart")) continue;
        child.CanCollide = child.Name === "Collision"
    }
})

type ZombieModel = ServerStorage["Models"]["ZombieModel"]
export class Zombie {

    state = (dt: number) => this.defaultState(dt)

    model: ZombieModel
    animations: AnimationTrack[] = []
    walkAnimation: AnimationTrack;
    ikControl: IKControl;
    target: Model;

    private hitbox: HitboxObject

    canAttack = true
    item: Model | undefined;
    rigidConstraint: RigidConstraint | undefined;

    stateConnection: RBXScriptConnection;

    onDeath() {
        new Soul(this.model.GetPivot().Position)
        const noob = Ragdoll.Clone()

        this.stateConnection.Disconnect()
        noob.PivotTo(
            this.model.HumanoidRootPart.CFrame
        )

        noob.Parent = Workspace

        this.ikControl.Enabled = false
        this.rigidConstraint?.Destroy()

        this.model.GetChildren().forEach((instance) => {
            if(instance.IsA("IKControl")) {
                instance.Enabled = false
            }
        })

        const ragdollTarget = new Instance("ObjectValue")
        ragdollTarget.Name = "RagdollTarget"
        ragdollTarget.Value = noob
        ragdollTarget.Parent = this.model
        CollectionService.AddTag(this.model, "Ragdoll")
        task.delay(25, () => {
            this.model.Destroy()
            noob.Destroy()
        })
    }

    attackFlag() {
        this.canAttack = false;
        const animation = sample(this.animations)
        animation.Play()
        animation.Ended.Once(() => {
            this.canAttack = true
        })
        damageFlag(10);
        hurtHighlight(flag)
    }

    attackPlayer() {
        this.canAttack = false;
        const animation = sample(this.animations)
        this.hitbox.HitStart(animation.Length);
        this.hitbox.Visualizer = true
        animation.Play()
        animation.Looped = false
        animation.Ended.Once(() => {
            this.canAttack = true
        })
    }

    attackPlayerState(dt: number) {
        const distance = this.getDistanceTo()
        print(this.canAttack)
        if(distance <= 5 && this.canAttack) {
            this.attackPlayer()
        }
        if(distance >= 100) {
            this.setTarget(flag)
            this.state = (dt) => { this.defaultState(dt) }
        }
        this.goThowardsTarget()
    }

    getDistanceTo(position: Vector3 = this.target.GetPivot().Position) {
        return (position.sub(this.model.GetPivot().Position)).Magnitude
    }

    defaultState(dt: number) {

        const distance = this.getDistanceTo()
        if(distance <= 5 && this.canAttack) {
            this.attackFlag();
        }

        this.ikControl.Enabled = false;
        this.ikControl.Target = undefined;
        //this.ikControl.Target = target.
        this.goThowardsTarget()
    }

    setTarget(target: Model) {
        this.target = target;
    }

    goThowardsTarget() {
        const distance = this.getDistanceTo()
        const humanoid = this.model.Humanoid

        if(distance <= 2) {
            this.walkAnimation.Stop();
            humanoid.MoveTo(this.model.HumanoidRootPart.Position)
            return;
        }

        const goal = this.target.GetPivot()
        humanoid.MoveTo(goal.Position)
        if(!this.walkAnimation.IsPlaying)
            this.walkAnimation.Play()
    }


    attackedByPlayer(player: Model | undefined) {

        if(!player) return

        const character = player as ZombieModel
        this.state = (dt: number) => this.attackPlayerState(dt);
        this.setTarget(player)
        //this.ikControl.Enabled = true;
        //this.ikControl.Target = character.HumanoidRootPart["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:Neck"]["mixamorig:Head"];
        this.goThowardsTarget()
    }

    private initAnimations() {
        if(!this.item) {
            this.loadAnimations(KICK)
            this.loadAnimations(PUNCH)
            return;
        }

        const anims = ReplicatedStorage.ItemAnimations.FindFirstChild(this.item.Name)
        const swings = [ anims!.FindFirstChild("Swing"), anims!.FindFirstChild("Swing2") ] as Instance[]
        this.loadAnimations(swings)

        const idle = anims!.FindFirstChild("Hold") as Animation
        const humanoid = this.model.Humanoid.Animator
        if(idle) {
            const priority = humanoid.LoadAnimation(idle)
            priority.Priority = Enum.AnimationPriority.Action2
            priority.Play()
        }
    }

    private loadAnimations(instance: Instance[]) {
        const humanoid = this.model.Humanoid.Animator
        instance.forEach((animation) => {
            if(!animation.IsA("Animation")) return
            const loaded = humanoid.LoadAnimation(animation)
            loaded.Priority = Enum.AnimationPriority.Action3
            this.animations.push(loaded)
        })
    }

    addItem(toAdd: Model) {
        const item = toAdd.Clone()
        this.item = item
        const rigid = new Instance("RigidConstraint")
        const attach2 = this.model["HumanoidRootPart"]["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:RightShoulder"]["mixamorig:RightArm"]["mixamorig:RightForeArm"]["mixamorig:RightHand"]["RightAttachBone"]
        rigid.Attachment0 = this.item.FindFirstChild("RootPart")?.FindFirstChild("Attachment") as Attachment
        rigid.Attachment1 = attach2
        rigid.Parent = this.item
        this.item.Parent = this.model
        this.rigidConstraint = rigid
    }

    constructor(position: Vector3) {

        this.model = model.Clone();
        this.model.PivotTo(new CFrame(position))
        this.model.Parent = Workspace

        this.addItem(ReplicatedStorage.Tools.Sword)

        this.ikControl = this.model.IKControl

        addEntity(this.model, this)
        entities.push(this)

        const humanoid = this.model.Humanoid
        const animator = humanoid.Animator
        const hitboxContainer = (this.item) ? this.item : this.model
        this.hitbox = new RaycastHitbox(hitboxContainer)
        this.hitbox.OnHit.Connect((_, humanoid) => {
            const player = Players.GetPlayerFromCharacter(this.target)
            if(humanoid === this.model.Humanoid) return
            if(player) {
                ReplicatedStorage.Events.CamShake.FireClient(player)
            }
            if(humanoid && this.target) {
                humanoid.TakeDamage(10)
            }
            if(this.target) {
                hurtHighlight(this.target)
            }
        })

        humanoid.Died.Once(() => {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                track.Stop(0)
            })
            this.state = () => {}
            this.onDeath()
        })

        this.initAnimations()

        this.target = flag;
        this.walkAnimation = animator.LoadAnimation(WALK)

        this.stateConnection = RunService.Heartbeat.Connect((dt) => {
            this.state(dt)
        })
    }
}