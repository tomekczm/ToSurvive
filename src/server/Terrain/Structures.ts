export function generateStructure(x: number, y: number, height: number) {
    const seed = 0.5 * (x + y) * (x + y + 1) + y
    const RNG = new Random(seed)

    const generateProp = RNG.NextInteger(0, 100) === 1

    if(generateProp) {
        
    }
}