import { RunService, ServerStorage, Workspace } from "@rbxts/services";
import { damageFlag, getFlagHealth } from "server/Flag";
import { sample } from "shared/Array";

const Animations = ServerStorage.Animations.Zombie
const model = ServerStorage.Models.ZombieModel

const WAKE_UP = Animations.StandUp
const IDLE = Animations.Idle
const WALK = Animations.Walk

const flag = Workspace.Flag

const KICK = Animations.Kick.GetChildren()
const PUNCH = Animations.Punch.GetChildren()

const entities: Zombie[] = []

const ATTACK_LENGTH = 5;

type ZombieModel = ServerStorage["Models"]["ZombieModel"]
export class Zombie {
    private model: ZombieModel // ZombieModel model;
    private wakeUpAnimation: AnimationTrack;
    private idleAnimation: AnimationTrack;
    private walkAnimation: AnimationTrack;

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

    defaultState(dt: number) {
        const target = flag.GetPivot().Position
        const lookVector = (target.sub(this.model.GetPivot().Position))
        const distance = lookVector.Magnitude

        
        if(distance < 1 && getFlagHealth() > 0) {
            this.resetTarget()

            if(!this.wasAttacking) {
                const anims = [...this.kicks, ...this.punches]
                const anim = sample(anims)
                anim.Play()
            }

            this.attackTimePassed += dt
            this.wasAttacking = true;
            if(this.attackTimePassed >= this.ATTACK_LENGTH) {
                this.wasAttacking = false;
                this.attackTimePassed = 0;
                damageFlag(this.damage)
            }
        } else {
            this.wasAttacking = false;
            this.attackTimePassed = 0;
            this.setDirection(lookVector.Unit)
        }
    }

    targetPlayerState(dt: number) {

    }

    attackedByPlayer(character: Model) {
        this.state = (dt) => this.targetPlayerState(dt)
        this.target = character
    }

    setTarget(target: Vector3) {
        this.setDirection((target.sub(this.model.GetPivot().Position)).Unit)
    }

    setDirection(direction: Vector3) {
        if(!this.walkAnimation.IsPlaying)
            this.walkAnimation.Play();
        const humanoid = this.model.ControllerManager
        const pivot = this.model.GetPivot()
        const flagPivot = flag.GetPivot()
        const lookAt = new Vector3(flagPivot.X, pivot.Y, flagPivot.Z)
        this.model.PivotTo(CFrame.lookAt(pivot.Position, lookAt))
        humanoid.MovingDirection = direction
    }

    resetTarget() {
        if(this.walkAnimation.IsPlaying)
            this.walkAnimation.Stop();
        const humanoid = this.model.ControllerManager
        humanoid.MovingDirection = new Vector3(0,0,0)
    }

    constructor(position: Vector3) {

        this.model = model.Clone()
        this.model.PivotTo(new CFrame(position))
        
        this.model.Parent = Workspace
        const humanoid = this.model.Humanoid.Animator
        this.humanoid = humanoid

        entities.push(this)

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

        this.wakeUpAnimation.Play()



        this.wakeUpAnimation.Stopped.Once(() => {
            this.idleAnimation.Play()
            RunService.Heartbeat.Connect((dt) => {
                this.state(dt)
            })
        })
    }
}