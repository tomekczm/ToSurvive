import { CollectionService, PathfindingService, Players, ReplicatedStorage, RunService, ServerStorage, Workspace } from "@rbxts/services";
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
import { Visualize } from "@rbxts/visualize";

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

const PATHFIND_UPDATE_TRESHOLD = 1;

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
    pathfinding: Path;

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

        const isCloseEnoughToFlag = this.isCloseEnoughToFlag()

        if(
            (distance >= 100 || humanoid?.Health === 0)
            && isCloseEnoughToFlag
        ) {
            this.setTarget(flag)
            this.setState("defaultState")
        }

        if(isCloseEnoughToFlag) {
            this.goThowardsTarget()
        } else {
            this.pathfindToTarget(dt)
        }
    }

    nextPathfindUpdate = 0;
    isInAStraightLine = false

    pathfindToTarget(dt: number) {
        const params = new RaycastParams()
        params.AddToFilter(
            this.model
            //CollectionService.GetTagged("Zombie")
        )

        params.AddToFilter(
            CollectionService.GetTagged("Building")
        )

        //print(this.isInAStraightLine)
        if(this.isInAStraightLine) {
            this.goThowardsTarget()
        }

        this.nextPathfindUpdate += dt;
        if(this.nextPathfindUpdate < PATHFIND_UPDATE_TRESHOLD) {
            return
        }

        const selfPivot = this.model!.GetPivot().Position
        const target = this.target as unknown as StarterPlayer["StarterCharacter"]
        const targetPivot = target.UpperTorso.GetPivot().Position 
        const substraction = selfPivot.sub(targetPivot)
        const distance = substraction.Magnitude


        const result = Workspace.Raycast(
            selfPivot, substraction.Unit.mul(-distance*2),
            params
        )
        this.isInAStraightLine = false
        if(result) {
            const instance = result.Instance
            if(instance.IsDescendantOf(this.target)) {
                this.isInAStraightLine = true
            }
        }

        this.nextPathfindUpdate = 0;
        this.forcePathfind()
    }

    private forcePathfind() {
        const path = this.pathfinding
        try {
            path.ComputeAsync(
                this.model.GetPivot().Position,
                this.target.GetPivot().Position
            )
            if(path.Status === Enum.PathStatus.Success)
                this.activatePathfind()
        } catch { this.isInAStraightLine = true }
    }

    private waypoints?: PathWaypoint[]
    private nextWaypointIndex?: number
    private reachedConnection?: RBXScriptConnection
    private blockedConnection?: RBXScriptConnection

    activatePathfind() {
        const humanoid = this.model.Humanoid
        const path = this.pathfinding
        this.waypoints = path.GetWaypoints()

        this.blockedConnection = path.Blocked.Connect((blockedWaypointIndex) => {
            if (blockedWaypointIndex >= this.nextWaypointIndex!) {
				this.blockedConnection?.Disconnect()
				this.forcePathfind()
            }
        })

        if(!this.reachedConnection) {
			this.reachedConnection = humanoid.MoveToFinished.Connect((reached) => {
				if(reached && this.nextWaypointIndex! < this.waypoints!.size()) {
					this.nextWaypointIndex! += 1
					humanoid.MoveTo(this.waypoints![this.nextWaypointIndex!].Position)
                } else {
					this.reachedConnection!.Disconnect()
					this.blockedConnection!.Disconnect()
				}
            })
        }

        this.nextWaypointIndex = 2
		humanoid.MoveTo(this.waypoints[this.nextWaypointIndex].Position)
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

    findNearestPlayer() {
        const players = Players.GetPlayers()
        let nearestDistance = math.huge
        let nearestPlayer: Player | undefined = undefined
        for(const player of players) {
            const pivot = player.Character?.GetPivot()

            if(!pivot) continue
            const distance = this.getDistanceTo(pivot.Position)
            if(distance < nearestDistance) {
                nearestDistance = distance
                nearestPlayer = player
            }
        }
        return nearestPlayer
    }

    isCloseEnoughToFlag() {
        const distance = this.getDistanceTo(
            Workspace.Flag.GetPivot().Position
        )

        // Too far away from base to care abt the flag
        return (distance <= 290)
    }

    defaultState(dt: number) {

        const distance = this.getDistanceTo()

        // Too far away from base to care abt the flag
        if(!this.isCloseEnoughToFlag()) {
            const nearestPlayer = this.findNearestPlayer()
            if(nearestPlayer) {
                this.attackedByPlayer(nearestPlayer!.Character)
            }
        }

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
        this.pathfinding = PathfindingService.CreatePath({
            AgentRadius: 4,
        })
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