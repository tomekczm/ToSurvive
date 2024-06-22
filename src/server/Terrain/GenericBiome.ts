import { Workspace } from "@rbxts/services";
import { BiomeProp } from "./BiomeProp";
import { Biome } from "./Main";

export abstract class GenericBiome implements Biome {
    abstract vector: Vector2;
    abstract props: BiomeProp[]
    abstract density: number;
    private random = new Random()

    abstract getMaterial(x: number, y: number): Enum.Material;
    getProp(x: number, y: number): Model | undefined {
        const num = this.random.NextInteger(0, 1000) / 1000;
        if(num >= this.density) return;

        const r = this.random.NextNumber();
        let sum = 0;
        for (const prop of this.props) {
            sum += prop.chance;
            if (r <= sum) {
                const clone = prop.model.Clone()
                clone.ScaleTo(this.random.NextInteger(7, 10) / 10)
                return clone
            };
        }

        return undefined;
    }
    
}