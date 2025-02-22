import { Presets } from "@rbxts/camera-shaker";
import Octree, { Node } from "@rbxts/octo-tree";
import { CollectionService, Players, ReplicatedStorage, RunService, TweenService, Workspace } from "@rbxts/services";
import { shake } from "client/CamShake";
import { quadraticBezier } from "shared/Bezier";
import { BOMB_EXPLOSION_TIME } from "shared/module";

const oresFolder = Workspace.Ores
const camera = Workspace!.CurrentCamera
  
interface OreData {
    isFullfilled: Model | undefined,
    name: string,
    serverObject: Vector3Value
}

const models = ReplicatedStorage.Ores
const modelLookup = new Map<string, Model>()
modelLookup.set("Coal", models.Coal)
modelLookup.set("Treasure", models.Treasure)
modelLookup.set("Bomb", models.Bomb)

const RNG = new Random()

let SEARCH_RADIUS = 55
const DEBUG_RADIUS = 1000
let debug = false

if (debug) {
    warn("USING DEBUG SEARCH_RADIUS")
    SEARCH_RADIUS = DEBUG_RADIUS
}

const vectorToModelMap = new Map<Vector3Value, Node<OreData>>()
export const ores = new Map<Model, OreData>()
const octTree = new Octree<OreData>() // this should be faST!!!!!

function foundOre(_ore: Instance) {
    if (!_ore.IsA("Vector3Value")) return
    octTree.CreateNode(_ore.Value, { 
        isFullfilled: undefined,
        name: _ore.Name,
        serverObject: _ore 
    })
}


function bombVFX(_bomb: Model) {
    const bombValue = new Instance("NumberValue")

    function toggleBurning(state: boolean) {
        attachment.GetChildren().forEach((value) => {
            if(value.IsA("ParticleEmitter")) {
                value.Enabled = state
            }
        })
    }

    TweenService.Create(
        bombValue,
        new TweenInfo(BOMB_EXPLOSION_TIME),
        { Value: 0.99 }
    ).Play()

    const bomb = _bomb.Clone() as ReplicatedStorage["Ores"]["Bomb"]
    bomb.SetAttribute("Highlight", false)
    bomb.Parent = Workspace
    const attachment = bomb.Handle.Attachment
    const attachmentWorldPosition = attachment.WorldPosition
    const middlePoint = bomb.Handle.MiddlePoint
    const endPoint = bomb.Handle.EndPoint

    bomb.Handle["Bomb Fuse"].Play()

    toggleBurning(true)
    
    bombValue.Parent = bomb
    bombValue.Changed.Connect((value) => {
        const position = quadraticBezier(
            value,
            attachmentWorldPosition,
            middlePoint.WorldPosition,
            endPoint.WorldPosition
        )
        const nextPosition =  quadraticBezier(
            value + 0.01,
            attachmentWorldPosition,
            middlePoint.WorldPosition,
            endPoint.WorldPosition
        )

         attachment.WorldCFrame = new CFrame(position, nextPosition).mul(
            CFrame.Angles(math.rad(-90), 0, 0)
         )
    })
    task.spawn(() => {
        task.wait(BOMB_EXPLOSION_TIME)
        toggleBurning(false)
        //attachment.Destroy()
        shake.Shake(Presets.Explosion)
        bomb.Handle["Bomb Fuse"].Stop()
        bomb.Handle.Smoke.Smoke.Emit(1)
        bomb.Handle["Bomb Explosion 1"].PlayOnRemove = true
        bomb.Handle["Bomb Explosion 1"].Destroy()
        bomb.Handle.Transparency = 1
        task.wait(2)
        bomb.Destroy()
    })
}

function oreDeleted(_ore: Instance) {
    if (!_ore.IsA("Vector3Value")) return
    const node = vectorToModelMap.get(_ore)!;
    vectorToModelMap.delete(_ore)

    const model = node?.Object.isFullfilled;
    octTree.RemoveNode(node)
    if(model) {
        if(model.Name === "Bomb") {
            bombVFX(model)
        }

        model.Destroy()
    }
}

oresFolder.GetChildren().forEach((child) => {
    foundOre(child)
})

oresFolder.ChildRemoved.Connect((child) => {
    oreDeleted(child)
})

oresFolder.ChildAdded.Connect((child) => {
    foundOre(child)
})

function getCamPos() {
    return camera?.CFrame.Position as Vector3
}

let lastPositionUpdated = getCamPos()

function update() {
    const pivot = getCamPos()
    if (!pivot) return
    const foundMap = new Set<string>()

    for (const ore of octTree.ForEachInRadius(pivot, SEARCH_RADIUS)) {
        const position = ore.Position
        foundMap.add(tostring(ore.Position))
        if (ore.Object.isFullfilled)
            continue
        const model = modelLookup.get(ore.Object.name)
        if(!model) return
        const clone = model.Clone()
        ore.Object.isFullfilled = clone

        const rX = math.rad(RNG.NextNumber(0, 360))
        const rY = math.rad(RNG.NextNumber(0, 360))
        const rZ = math.rad(RNG.NextNumber(0, 360))

        clone.PivotTo(new CFrame(position).mul(CFrame.Angles(rX, rY, rZ)))
        clone.Parent = Workspace.Ores

        ores.set(clone, ore.Object)
        vectorToModelMap.set(ore.Object.serverObject, ore)
    }

    ores.forEach((data, ore) => {
        const key = tostring(ore.GetPivot().Position)
        if (!foundMap.has(key)) {
            ore.Destroy()
            data.isFullfilled = undefined;
        }
    })
}
RunService.RenderStepped.Connect((dt) => {
    const newPos = getCamPos()
    const distance = (lastPositionUpdated.sub(newPos)).Magnitude

    if (distance >= SEARCH_RADIUS * 0.5) {
        update()
        lastPositionUpdated = newPos
    }
})