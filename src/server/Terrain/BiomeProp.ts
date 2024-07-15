export class BiomeProp {
    chance: number;
    model: Model;
    constructor(chance: number, model: Model) {
        this.chance = chance;
        this.model = model;
    }

    getClone(random: Random) {
        const clone = this.model.Clone()
        clone.ScaleTo(random.NextInteger(7, 10) / 10)
        return this.model.Clone()
    }
}