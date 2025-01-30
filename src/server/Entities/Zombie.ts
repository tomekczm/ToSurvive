import { CollectionService, Players, ReplicatedStorage, RunService, ServerStorage, Workspace } from "@rbxts/services";
import { damageFlag, getFlagHealth } from "server/Flag";
import { hurtHighlight } from "shared/VFX";
import { sample } from "shared/Array";
import { addEntity } from "./Entities";
import { Soul } from "./Soul";
import { Janitor } from "@rbxts/janitor";
import RaycastHitbox, { HitboxObject } from "@rbxts/raycast-hitbox";
import { MeleeWeapon } from "./ZombieWeapons/Melee";
import { IZombieWeapon } from "./ZombieWeapons/IZombieWeapon";
import { Throwable, ThrowableBuilder } from "./ZombieWeapons/Throwable";
import { InteractsWithPlayer } from "./InteractsWithPlayer";

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

const params = new OverlapParams()
params.FilterType = Enum.RaycastFilterType.Include
params.FilterDescendantsInstances = [Workspace.PlayerBuilding]

type ZombieModel = ServerStorage["Models"]["ZombieModel"]
export class Zombie implements InteractsWithPlayer {

    state = (dt: number) => this.defaultState(dt)

    model: ZombieModel
    animations: AnimationTrack[] = []
    walkAnimation: AnimationTrack;
    ikControl: IKControl;
    target: Model;

    isProjectile = false

    canAttack = true
    item!: IZombieWeapon;
    rigidConstraint: RigidConstraint | undefined;
    nextCheckTimer: number = 0

    stateConnection: RBXScriptConnection;

    onDeath() {
        //new Soul(this.model.GetPivot().Position)
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

    attackFlag(dt: number) {
        this.canAttack = false;
        this.item.attackFlag()
    }

    attackBuilding(dt: number) {
        if(this.canAttack) {
            this.canAttack = false;
            this.item.attackBuilding()
        }
    }

    attackPlayer(dt: number) {
        this.item.attackPlayer(dt)
    }

    attackPlayerState(dt: number) {
        this.nextCheckTimer += dt;
        const distance = this.getDistanceTo()
        const humanoid = this.target.FindFirstChildOfClass("Humanoid")
        this.attackPlayer(dt)
        if(distance >= 100 || humanoid?.Health === 0) {
            this.setTarget(flag)
            this.setState("defaultState")
        }
        this.goThowardsTarget()
    }

    setState(state: string) {
        const cb = (this as unknown as Map<string, (arg0: unknown, arg1: number) => void>).get(state)
        assert(cb)
        this.item.stateUpdated(state)
        this.state = (dt) => { cb(this, dt) }
    }

    getDistanceTo(position: Vector3 = this.target.GetPivot().Position) {
        return (position.sub(this.model.GetPivot().Position)).Magnitude
    }

    defaultState(dt: number) {

        const distance = this.getDistanceTo()
        if(distance <= 5 && this.canAttack) {
            this.attackFlag(dt);
        }

        this.ikControl.Enabled = false;
        this.ikControl.Target = undefined;
        this.nextCheckTimer += dt;
        this.goThowardsTarget()
    }

    attackBuildingState(dt: number) {
        if(!this.target.IsDescendantOf(Workspace)) {
            this.setTarget(Workspace.Flag)
            this.setState("defaultState")
        }
        this.attackBuilding(dt)
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

        if(this.nextCheckTimer >= 1) {
            const raycast = Workspace.GetPartBoundsInBox(
                this.model.GetPivot(),
                this.model.GetExtentsSize().mul(1.1), params
            )
            for(let part of raycast) {
                const model = part.FindFirstAncestorOfClass("Model")
                if(model) {
                    humanoid.MoveTo(this.model.HumanoidRootPart.Position)
                    this.setState("attackBuildingState")
                    this.setTarget(model)
                    return;
                }
            }
            this.nextCheckTimer = 0;
        }

        const goal = this.target.GetPivot()
        humanoid.MoveTo(goal.Position)


        if(!this.walkAnimation.IsPlaying)
            this.walkAnimation.Play()
    }


    attackedByPlayer(player: Model | undefined) {

        if(!player) return

        const character = player as ZombieModel
        this.setState("attackPlayerState")
        this.setTarget(player)
        //this.ikControl.Enabled = true;
        //this.ikControl.Target = character.HumanoidRootPart["mixamorig:Hips"]["mixamorig:Spine"]["mixamorig:Spine1"]["mixamorig:Spine2"]["mixamorig:Neck"]["mixamorig:Head"];
        this.goThowardsTarget()
    }

    addItem(item: IZombieWeapon) {
        this.item = item
    }

    constructor(position: Vector3) {

        this.model = model.Clone();
        this.model.PivotTo(new CFrame(position))
        this.model.Parent = Workspace

        //this.addItem(new MeleeWeapon(this, ReplicatedStorage.Tools.Sword.Clone()))

        this.addItem(new Throwable(
            this, ReplicatedStorage.Tools.Spear.Clone(),
            true
        ))

        this.ikControl = this.model.IKControl

        addEntity(this.model, this)
        entities.push(this)

        const humanoid = this.model.Humanoid
        const animator = humanoid.Animator

        humanoid.Died.Once(() => {
            animator.GetPlayingAnimationTracks().forEach((track) => {
                track.Stop(0)
            })
            this.state = () => {}
            this.onDeath()
        })

        this.target = flag;
        this.walkAnimation = animator.LoadAnimation(WALK)

        this.stateConnection = RunService.Heartbeat.Connect((dt) => {
            this.state(dt)
        })
    }
}