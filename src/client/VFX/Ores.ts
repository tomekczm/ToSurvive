import Octree from "@rbxts/octo-tree";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";

const oresFolder = Workspace.Ores

interface OreData {
    isFullfilled: boolean
}

const coalOre = ReplicatedStorage.Ores.Coal

const RNG = new Random()

let SEARCH_RADIUS = 55
const DEBUG_RADIUS = 1000
let debug = true

if(debug) {
    warn("USING DEBUG SEARCH_RADIUS")
    SEARCH_RADIUS = DEBUG_RADIUS
}

const ores = new Map<Model, OreData>()
const octTree = new Octree<OreData>()

function foundOre(_ore: Instance) {
    if(!_ore.IsA("Vector3Value")) return
    octTree.CreateNode(_ore.Value, { isFullfilled: false })
}

oresFolder.GetChildren().forEach((child) => {
    foundOre(child)
})

oresFolder.ChildAdded.Connect((child) => {
    foundOre(child)
})

task.spawn(() => {
    while(true) {
        task.wait(5)
        const pivot = Workspace.CurrentCamera?.CFrame.Position
        if(!pivot) continue
        const tree = octTree.SearchRadius(pivot, SEARCH_RADIUS)
        const foundMap = new Set<string>()
        print(tree.size())
        tree.forEach((ore) => {
            const position = ore.Position
            foundMap.add(tostring(ore.Position))
            if(ore.Object.isFullfilled)
                return
            ore.Object.isFullfilled = true
            const clone = coalOre.Clone()
            
            const rX = math.rad(RNG.NextNumber(0, 360))
            const rY = math.rad(RNG.NextNumber(0, 360))
            const rZ = math.rad(RNG.NextNumber(0, 360))

            clone.PivotTo(new CFrame(position).mul(CFrame.Angles(rX, rY,rZ)))
            clone.Parent = Workspace.Ores

            ores.set(clone, ore.Object)
        })

        ores.forEach((data, ore) => {
            const key = tostring(ore.GetPivot().Position)
            if(!foundMap.has(key)) {
                ore.Destroy()
                data.isFullfilled = false;
            }
        })
    }
})