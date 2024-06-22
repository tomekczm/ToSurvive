import { sample } from "shared/Array";
import type { Biome } from "../Main";
import { ServerStorage } from "@rbxts/services";


export class Desert implements Biome {
    getProp(x: number, y: number): Model | undefined {
        return undefined;
    }
    getMaterial(x: number, y: number): Enum.Material {
        const showFeatures = math.noise(x * 0.001 + 863, y * 0.001 + 863) < 0.2

        if (showFeatures) {
            return Enum.Material.Sandstone
        }
        return Enum.Material.Sand
    } 
    vector = new Vector2(1, -0.5);
}