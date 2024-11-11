import { Players, RunService, TweenService, UserInputService, Workspace } from "@rbxts/services";
const horizontalSpacing = 200;

let deepestLevel = 0;
const nodesPerLevel = new Map<number, Node[]>();

function insertNodeIntoLookup(node: Node) {
    const arr = nodesPerLevel.get(node.depth)
    if(deepestLevel < node.depth) {
        deepestLevel = node.depth
    }
    if(!arr) {
        let newArr = [ node ]
        nodesPerLevel.set(node.depth, newArr)
        return;
    }
    arr.push(node);
}

class Node {
    childern: Node[] = [];
    depth = 0;
    content: string;
    uiElement: TextLabel | undefined = undefined
    parent: Node | undefined;
    lines: Path2D[] = [];

    addNode(node: Node) {
        node.depth = this.depth + 1
        node.parent = this;
        this.childern.push(node);
        insertNodeIntoLookup(node);
        return node
    }

    static createCoreNode() {
        const node = new Node()
        insertNodeIntoLookup(node);
        return node;
    }

    constructor(content: string = "") {
        this.content = content;
    }
}

const coreNode = Node.createCoreNode()
const resourceCollection = new Node("1");
const fightingUpgrades = new Node("2");
const buildingUpgrades = new Node("3");
const test = new Node()
const test2 = new Node()
const test3 = new Node()

coreNode.addNode(test2)
coreNode.addNode(test3)
coreNode.addNode(resourceCollection)
coreNode.addNode(fightingUpgrades)
coreNode.addNode(buildingUpgrades)
coreNode.addNode(test)

//test//.addNode(new Node())

resourceCollection.addNode(new Node("X"))
resourceCollection.addNode(new Node("Y"))

buildingUpgrades.addNode(new Node("X"))
buildingUpgrades.addNode(new Node("Y"))

const TreeCore = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("Tree") as StarterGui["Tree"]
const TreeBackground = TreeCore.WaitForChild("Background") as typeof TreeCore["Background"]
const TreeHolder =  TreeBackground.WaitForChild("Holder") as typeof TreeCore["Background"]["Holder"]
const Gradient = TreeCore.WaitForChild("Gradient") as typeof TreeCore["Gradient"]

function calculateOffset(node: Node) {
    return calculateNodeXOffset(node);
}

function calculateNodeXOffset(node: Node) {

    let xOffset = 0
    for(const nodeChild of node.childern) {
        xOffset += nodeChild.uiElement!.Position.X.Offset;
    }

    xOffset /= node.childern.size();
    return xOffset
}

function createNode(node: Node, manualXOffset: number | undefined = undefined) {
    let xOffset = manualXOffset ?? calculateOffset(node);
    let yOffset = 100 * node.depth
    const frame = new Instance("TextLabel")
    frame.Size = UDim2.fromOffset(50, 50)
    frame.Name = node.content || "NODE"
    frame.Text = node.content
    frame.Position = UDim2.fromOffset(xOffset,yOffset);
    frame.Parent = TreeHolder;
    node.uiElement = frame;

    for(const nodeChild of node.childern) {
        const line = new Instance("Path2D")
        node.lines.push(line)
        if(!nodeChild.uiElement) continue;
        const bottom = node.uiElement.Position.add(UDim2.fromOffset(25,50))
        const top = nodeChild.uiElement.Position.add(UDim2.fromOffset(25, 0));
        line.SetControlPoints(
            [
                new Path2DControlPoint(bottom),
                new Path2DControlPoint(top),
            ]
        )
        line.Parent = TreeHolder;
    }

    return node
}

function recursiveOffset(node: Node, offset: number) {
    if(node.uiElement) {
        node.uiElement.Position = node.uiElement.Position.sub(UDim2.fromOffset(offset, 0))
    }
    for(const line of node.lines) {
        const points = line.GetControlPoints() as Path2DControlPoint[]
        const newPoints: Path2DControlPoint[] = [];
        points.forEach((point, index) => {
            newPoints.insert(index, new Path2DControlPoint(point.Position.sub(UDim2.fromOffset(offset, 0))))
        })
        line.SetControlPoints(newPoints)
    }
    for(const _node of node.childern) {
        recursiveOffset(_node, offset)
    }
}

function isFull(node: Node | undefined = undefined): node is Node & { uiElement: Frame }  {
    return node !== undefined && node.uiElement !== undefined
}

function generateLevel(level: number) {
    const nodes = nodesPerLevel.get(level)
    if(!nodes) return

    let childless: Node[] = []
    for(const node of nodes) {
        if(node.childern.size() === 0) {
            childless.push(node)
            continue
        }
        createNode(node)
    }

    while(childless.size() !== 0) {
        for(let childlessIndex = 0; childlessIndex < childless.size(); childlessIndex++) {
            const node = childless[childlessIndex]
            const index = nodes.indexOf(node)
            const toLeft = nodes[index - 1]
            const toRight = nodes[index + 1]

            if(isFull(toLeft) && isFull(toRight)) {
                const leftOffset = toLeft.uiElement.Position.X.Offset
                const rightOffset = toRight.uiElement.Position.X.Offset
                createNode(node, (leftOffset + rightOffset)/2)
                childless.remove(childlessIndex);
            }else if (isFull(toLeft) && !isFull(toRight)) {
                const leftOffset = toLeft.uiElement.Position.X.Offset
                for (let i = index - 1; i >= 0; i--) {
                    const leftNode = nodes[i];
                    recursiveOffset(leftNode, 100);
                }
                createNode(node, (leftOffset))
                childless.remove(childlessIndex);
            }else if (!isFull(toLeft) && isFull(toRight)) {
                const rightOffset = toRight.uiElement.Position.X.Offset;
                for (let i = index + 1; i < nodes.size(); i++) {
                    const rightNode = nodes[i];
                    recursiveOffset(rightNode, -100);
                }
                createNode(node, rightOffset);
                childless.remove(childlessIndex);
            }
        }
    }

    generateLevel(level - 1)
}

function generateLinearChart() {
    const nodes = nodesPerLevel.get(deepestLevel)
    if(!nodes) return;
    let xOffset = 0;
    let yOffset = 100 * deepestLevel
    for(const node of nodes) {
        const frame = new Instance("TextLabel")
        frame.Size = UDim2.fromOffset(50, 50)
        frame.Position = UDim2.fromOffset(xOffset,yOffset);
        frame.Parent = TreeHolder;
        node.uiElement = frame;
        xOffset += 100;
    }
    generateLevel(deepestLevel - 1);
}

/*
function addCircularChildern(_node: Node, radius: number, min: number, max: number) {
    const size = (max - min) / _node.childern.size()
    let angle = min;
    for(const node of _node.childern) {
        const frame = new Instance("TextLabel")
        frame.Size = UDim2.fromOffset(50, 50)
        const x = radius * math.cos(math.rad(angle));
        const y = radius * math.sin(math.rad(angle));
        frame.Position = UDim2.fromOffset(x,y);
        frame.Parent = TreeHolder;
        node.uiElement = frame;
        angle += size;

        const line = new Instance("Path2D")
        if(!node.uiElement || !_node.uiElement) continue;
        const bottom = _node.uiElement.Position.add(UDim2.fromOffset(25, 25))
        const top = node.uiElement.Position.add(UDim2.fromOffset(25, 25));
        line.SetControlPoints(
            [
                new Path2DControlPoint(bottom),
                new Path2DControlPoint(top),
            ]
        )
        line.Parent = TreeHolder;

        addCircularChildern(node, radius + 100, angle - size, angle)
    }
}

function generateCircularChart() {
    const childern = coreNode.childern.size()
    const radius = 100;
    const fragmentSize = 360 / childern;
    let count = 0;

    for(const node of coreNode.childern) {
        const frame = new Instance("TextLabel")
        frame.Size = UDim2.fromOffset(50, 50)
        const x = radius * math.cos(math.rad(count));
        const y = radius * math.sin(math.rad(count));

        frame.Position = UDim2.fromOffset(x,y);
        frame.Parent = TreeHolder;
        node.uiElement = frame;
        
        count += fragmentSize;
        addCircularChildern(node, radius + 300, count - fragmentSize, count)
    }
}
*/

//generateCircularChart()
generateLinearChart();

function openTree() {
    const uiGradient = Gradient.UIGradient
    uiGradient.Offset = new Vector2(0, -1)

    Gradient.Visible = true
    TreeBackground.Visible = true

    let avgX = 0
    let xCounter = 0
    let avgY = 0
    let yCounter = 0


    TreeHolder.GetChildren().forEach((instance) => {
        if(instance.IsA("TextLabel")) {
            const position = instance.Position
            avgX += position.X.Offset
            xCounter++;

            avgY += position.Y.Offset
            yCounter++;
        }
    })

    avgX /= xCounter;
    avgY /= yCounter;

    TreeHolder.GetChildren().forEach((instance) => {
        if(instance.IsA("TextLabel")) {
            const position = instance.Position
            instance.Position = UDim2.fromOffset(avgX, avgY)
            print(instance.Position)
            TweenService.Create(
                instance, 
                new TweenInfo(0.5),
                {
                    Position: position
                }
            ).Play()
        }
    })

    TweenService.Create(
        uiGradient, 
        new TweenInfo(2),
        {
            Offset: new Vector2(0, 1)
        }
    ).Play()

    let lastMouse = UserInputService.GetMouseLocation()
    let goal = TreeHolder.Position

    RunService.BindToRenderStep("MouseMovement", Enum.RenderPriority.Input.Value, (dt) => {
        const newMouse = UserInputService.GetMouseLocation()
        let _lastmouse = lastMouse
        lastMouse = newMouse

        TreeHolder.Position = TreeHolder.Position.Lerp(goal, dt)

        const mousePressed = UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)
        if(!mousePressed) {
            return
        }

        const delta = newMouse.sub(_lastmouse)
        goal = goal.add(UDim2.fromOffset(delta.X, delta.Y))
    })
}

task.delay(5, () => {
    //openTree()
})