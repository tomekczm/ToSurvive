
import { ServerStorage, Workspace } from "@rbxts/services";
import { sample } from "shared/Array";
import { getData } from "../Main";
import { ConvexHull } from "@rbxts/geom/Output/Algorithms/Convex-Hull";

const village = ServerStorage.Structures.Village

const cores = village.Core.GetChildren() as Model[]
const streets = village.Paths.GetChildren() as Model[]
const walls = village.Walls.GetChildren() as Model[]
const decorations = village.WaitForChild("Decorations").GetChildren() as Model[]
const startingExtension = village.Paths.FindFirstChild("StraightPath") as Model

export function createVillage(position: Vector3, depth = 2) {
    /*
    createStructure({
        cores: cores,
        parts: streets,
        walls: walls,
        decorations: decorations,
        startingExtension: startingExtension,
        extensionNames: ["StreetConnector", "Point.009"],
        decorationNames: [],
        canFly: false
    }, position, depth)
    */
}