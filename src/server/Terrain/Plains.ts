import type { Biome } from "./Main";

export class Plains implements Biome {
    getMaterial(x: number, y: number): Enum.Material {
        const showFeatures = math.noise(x * 0.001, y * 0.001) < 0

        if (math.abs(math.noise((x * 0.1) + 643, (y * 0.1) + 643)) < 0.2 && showFeatures) {
            return Enum.Material.LeafyGrass
        }
        return Enum.Material.Grass
    }
    vector = new Vector2(1, 0);

}