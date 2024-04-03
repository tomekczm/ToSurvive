import type { Biome } from "./Main";

export class Rock implements Biome {
    getMaterial(x: number, y: number): Enum.Material {
       return Enum.Material.Rock
    }
    vector = new Vector2(-1, 1);

}