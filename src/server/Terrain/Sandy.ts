import type { Biome } from "./Main";

export class Sandy2 implements Biome {
    getMaterial(x: number, y: number): Enum.Material {
        return Enum.Material.Sand
    }
    vector = new Vector2(0, 1);
}