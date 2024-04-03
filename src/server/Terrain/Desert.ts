import type { Biome } from "./Main";

export class Desert implements Biome {
    getMaterial(x: number, y: number): Enum.Material {
        const showFeatures = math.noise(x * 0.001 + 863, y * 0.001 + 863) < 0.2

        if (showFeatures) {
            return Enum.Material.Sandstone
        }
        return Enum.Material.Sand
    }
    vector = new Vector2(1, -0.5);
}