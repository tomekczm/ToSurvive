import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";

/*
const model = ServerStorage.Models.Golem 
type ENTITY = typeof model

const Animations = ReplicatedStorage.Animations.Golem

const WALK_ANIMATION = Animations.Walk
const IDLE_ANIMATION = Animations.Idle
const JUMP_ANIMATION = Animations.Jump

const RUNNING_STATE = Enum.HumanoidStateType.Running

export class Golem {
    entity: ENTITY

    humanoid: ENTITY["Humanoid"];
    animator: Animator;

    walkAnimation: AnimationTrack;
    idleAnimation: AnimationTrack;
    jumpAnimation: AnimationTrack;
    control: IKControl;

    constructor(spawn: Vector3) {
        this.entity = model.Clone()
        this.entity.PivotTo(new CFrame(spawn))
        this.humanoid = this.entity.Humanoid
        this.animator = this.humanoid.Animator

        this.control = this.entity.ArmControl
        this.entity.Parent = Workspace

        this.walkAnimation = this.animator.LoadAnimation(WALK_ANIMATION)

        this.idleAnimation = this.animator.LoadAnimation(IDLE_ANIMATION)
        this.jumpAnimation = this.animator.LoadAnimation(JUMP_ANIMATION)

        this.walkAnimation.Priority = Enum.AnimationPriority.Movement
        this.idleAnimation.Priority = Enum.AnimationPriority.Idle

        this.humanoid.StateChanged.Connect((oldState, newState) => {
            if(oldState === RUNNING_STATE) {
                this.walkAnimation.Stop()
            }
            if(newState === RUNNING_STATE) {
                this.walkAnimation.Play()
                //this.walkAnimation.AdjustSpeed(0.5)
            }
        })

        this.humanoid.Move(new Vector3(100,0,0))

        this.idleAnimation.Play()
    }
}
    */