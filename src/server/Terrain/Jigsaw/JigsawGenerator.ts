import { Workspace } from "@rbxts/services";

const RNG = new Random()
export class JigsawGenerator {
    constructor(
        private startPool: Model[],
        private pool: Model[]
    ) {}

    getConnectors(model: Model) {
        return model.GetDescendants().filter((instance) => instance.IsA("Attachment"))
    }

    generateStructure(maxLimit: number) {
        const startPiece = RNG.Sample(this.startPool).Clone()
        startPiece.Parent = Workspace

        let pieceCount = 0;
        let connectors = this.getConnectors(startPiece)
        while(connectors.size() !== 0) {
            if(pieceCount >= maxLimit) {
                break;
            }

            const connectTo = connectors.SamplePop();
            assert(connectTo)

            const nextPiece = this.pool.Sample().Clone()
            nextPiece.Parent = Workspace
            nextPiece.PivotTo(connectTo.WorldCFrame)

            const overlapParams = new OverlapParams()
            overlapParams.AddToFilter(nextPiece)
            const [position, size] = nextPiece.GetBoundingBox()

            const overlapResult = Workspace.GetPartBoundsInBox(
                position, size.mul(0.9), overlapParams
            )

            if(overlapResult.size() !== 0) {
                task.wait()
                nextPiece.Destroy()
                connectors.push(connectTo)
                task.wait()
                continue;
            }

            connectors = [
                ...connectors,
                ...this.getConnectors(nextPiece)
            ]

            pieceCount++;
            task.wait()
        }
    }
}