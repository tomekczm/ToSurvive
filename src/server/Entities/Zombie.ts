import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { damageFlag, getFlagHealth } from "server/Flag";
import { hurtHighlight } from "server/VFX";
import { sample } from "shared/Array";
import { addEntity } from "./Entities";
import { Soul } from "./Soul";
import { Janitor } from "@rbxts/janitor";

const Animations = ReplicatedStorage.Animations.Zombie
const model = ServerStorage.Models.ZombieModel

const WAKE_UP = Animations.StandUp
const IDLE = Animations.Idle
const WALK = ReplicatedStorage.Animations.Walking

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
    private model: ZombieModel // ZombieModel model;
    private wakeUpAnimation: AnimationTrack;
    private idleAnimation: AnimationTrack;
    private walkAnimation: AnimationTrack;

    private janitor = new Janitor();

    private wasAttacking = false;
    private damage = 10
    private ATTACK_LENGTH = 5;
    private attackTimePassed = 0;
    attacker: Model | undefined

    private kicks: AnimationTrack[] = []
    private punches: AnimationTrack[] = []

    

    state = (dt: number) => this.defaultState(dt)
    humanoid: Animator;
    target?: Model;
    goal: Vector3 | undefined;
    ikControl: IKControl;
    targetHumanoid: Humanoid | undefined;

    death() {
        new Soul(this.model.GetPivot().Position)
        const noob = Ragdoll.Clone()

        noob.PivotTo(
            this.model.HumanoidRootPart.CFrame
        )

        noob.Parent = Workspace

        this.ikControl.Enabled = false

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
        this.janitor.Cleanup()
        task.delay(25, () => {
            this.model.Destroy()
            noob.Destroy()
        })
    }

    defaultState(dt: number) {
        const target = flag.GetPivot().Position
        this.ikControl.Enabled = false;
        this.ikControl.Target = undefined;
        this.target = flag;
        this.setTarget(target)
        //this.ikControl.Target = target.
    }

    targetPlayerState(dt: number) {
        if(this.targetHumanoid?.Health === 0) {
            this.state = (dt) => { this.defaultState(dt) }
        }
        if(this.target) {
            const playerPivot = this.target.GetPivot().Position
            const distance = this.getDistanceTo(playerPivot)
            if(distance >= 30) {
                this.state = (dt) => { this.defaultState(dt) }
                return
            }
            this.setTarget(playerPivot)
        }
    }

    attackedByPlayer(_character: unknown) {
        const character = _character as ZombieModel
        this.state = (dt) => this.targetPlayerState(dt)
        this.target = character
        this.targetHumanoid = character.FindFirstChildOfClass("Humanoid")
        this.ikControl.Target = character.HumanoidRootPart["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:Neck"]["mixamorig:Head"]
    }

    getDistanceTo(position: Vector3) {
        return (position.sub(this.model.GetPivot().Position)).Magnitude
    }

    setTarget(target: Vector3) {
        const humanoid = this.model.Humanoid
        this.goal = target
        const distance = this.getDistanceTo(this.goal);

        if(distance <= 2) {
            this.walkAnimation.Stop();
            humanoid.MoveTo(this.model.HumanoidRootPart.Position)

            const humanoidTarget = this.target?.FindFirstChild("Humanoid") as Humanoid

            if(!this.wasAttacking) {
                const anims = [...this.kicks, ...this.punches]
                const anim = sample(anims)
                anim.Play()
                this.wasAttacking = true

                task.delay(anim.Length / 2, () => {
                    const player = Players.GetPlayerFromCharacter(this.target)
                    if(player) {
                        ReplicatedStorage.Events.CamShake.FireClient(player)
                    }
                    if(humanoidTarget && this.target) {
                        humanoidTarget.TakeDamage(10)
                    }
                    if(this.target) {
                        hurtHighlight(this.target)
                    }
                })

                task.delay(anim.Length, () => {
                    this.wasAttacking = false
                })
            }
            return
        }

        if(!this.walkAnimation.IsPlaying)
            this.walkAnimation.Play();  


        //print(target)
        humanoid.MoveTo(target)
    }


    resetTarget() {
        if(this.walkAnimation.IsPlaying)
            this.walkAnimation.Stop();
    }

    constructor(position: Vector3) {

        this.model = model.Clone()
        this.model.PivotTo(new CFrame(position))
        addEntity(this.model, this)
        this.model.Parent = Workspace

        const humanoidRootPart = this.model.FindFirstChild("HumanoidRootPart") as BasePart
        const humanoid = this.model.Humanoid.Animator
        this.humanoid = humanoid

        entities.push(this)
        this.ikControl = this.model.IKControl
        KICK.forEach((animation) => {
            if(!animation.IsA("Animation")) return
            const loaded = humanoid.LoadAnimation(animation)
            loaded.Priority = Enum.AnimationPriority.Action
            this.kicks.push(
                loaded
            )
        })

        PUNCH.forEach((animation) => {
            if(!animation.IsA("Animation")) return
            const loaded = humanoid.LoadAnimation(animation)
            loaded.Priority = Enum.AnimationPriority.Action
            this.punches.push(
                loaded
            )
        })

        this.wakeUpAnimation = humanoid.LoadAnimation(WAKE_UP)
        this.wakeUpAnimation.Looped = false
        this.idleAnimation = humanoid.LoadAnimation(IDLE)
        this.walkAnimation = humanoid.LoadAnimation(WALK)

        //controllerManager.BaseMoveSpeed = 0

        //this.walkAnimation.GetMarkerReachedSignal("StepStart").Connect(() => {
        //    humanoidRootPart.ApplyImpulse(controllerManager.MovingDirection.mul(250))
        //})

        this.wakeUpAnimation.Play()


        const died = this.model.Humanoid.Died.Connect(() => {
            this.humanoid.GetPlayingAnimationTracks().forEach((track) => {
                track.Stop(0)
            })
            this.state = () => {}
            this.death()
        })
        this.janitor.Add(died, "Disconnect")

        const wakeUpConnection = this.wakeUpAnimation.Stopped.Once(() => {
            this.idleAnimation.Play()
            const heartbeat = RunService.Heartbeat.Connect((dt) => {
                this.state(dt)
            })
            this.janitor.Add(heartbeat, "Disconnect")
        })
        this.janitor.Add(wakeUpConnection, "Disconnect")
    }
}