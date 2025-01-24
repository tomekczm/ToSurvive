import Octree from "@rbxts/octo-tree";
import { Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";

const oresFolder = Workspace.Ores
const camera = Workspace!.CurrentCamera

interface OreData {
    isFullfilled: boolean
}

const coalOre = ReplicatedStorage.Ores.Coal

const RNG = new Random()

let SEARCH_RADIUS = 55
const DEBUG_RADIUS = 1000
let debug = false

if (debug) {
    warn("USING DEBUG SEARCH_RADIUS")
    SEARCH_RADIUS = DEBUG_RADIUS
}

const ores = new Map<Model, OreData>()
const octTree = new Octree<OreData>() // this should be faST!!!!!

function foundOre(_ore: Instance) {
    if (!_ore.IsA("Vector3Value")) return
    octTree.CreateNode(_ore.Value, { isFullfilled: false })
}

oresFolder.GetChildren().forEach((child) => {
    foundOre(child)
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
        ore.Object.isFullfilled = true
        const clone = coalOre.Clone()

        const rX = math.rad(RNG.NextNumber(0, 360))
        const rY = math.rad(RNG.NextNumber(0, 360))
        const rZ = math.rad(RNG.NextNumber(0, 360))

        clone.PivotTo(new CFrame(position).mul(CFrame.Angles(rX, rY, rZ)))
        clone.Parent = Workspace.Ores

        ores.set(clone, ore.Object)
    }

    ores.forEach((data, ore) => {
        const key = tostring(ore.GetPivot().Position)
        if (!foundMap.has(key)) {
            ore.Destroy()
            data.isFullfilled = false;
        }
    })
}
RunService.RenderStepped.Connect((dt) => {
    const newPos = getCamPos()
    const distance = (lastPositionUpdated.sub(newPos)).Magnitude

    if (distance >= SEARCH_RADIUS * 0.5) {
        print("Update")
        update()
        lastPositionUpdated = newPos
    }
})