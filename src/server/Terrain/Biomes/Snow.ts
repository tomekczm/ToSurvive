import { ServerStorage } from "@rbxts/services";
import { BiomeProp } from "../BiomeProp";
import { GenericBiome } from "../GenericBiome";
import type { Biome } from "../Main";

const Props = ServerStorage.Models.IceBiome

export class Snow extends GenericBiome {
    props = [
        new BiomeProp(1/3, Props.MultiRock),
        new BiomeProp(1/3, Props.Tree2),
        new BiomeProp(1/3, Props.Tree1)
    ];
    density = 0.005;
    getMaterial(x: number, y: number): Enum.Material {
        const noiseValue1 = math.noise((x + 733) * 0.001, (y + 733) * 0.1);
        const noiseValue2 = math.noise((x + 568) * 0.001, (y + 568) * 0.1);
    
        let material2: Enum.Material;
        if (noiseValue2 >= 0.2 && noiseValue2 <= 0.3) {
            material2 = Enum.Material.Snow;
        } else if (noiseValue2 > 0.3 && noiseValue2 <= 0.5) {
            material2 = Enum.Material.Ice;
        } else {
            material2 = Enum.Material.Glacier;
        }
    
        let material1: Enum.Material;
        if (noiseValue1 >= 0.2 && noiseValue1 <= 0.3) {
            material1 = Enum.Material.Glacier;
        } else if (noiseValue1 > 0.3 && noiseValue1 <= 0.5) {
            material1 = Enum.Material.Ice;
        } else {
            material1 = Enum.Material.Glacier;
        }
    
        if (math.abs(math.noise((x * 0.1) + 643, (y * 0.1) + 643)) < 0.2) {
            return material2;
        }
        return material1;
    }
    vector = new Vector2(-1, 0);

}