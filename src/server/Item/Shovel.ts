import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { ServerItem } from "./ServerItem";
import { SwingAbility } from "server/ItemAbilities/Swing";
import { BOMB_EXPLOSION_TIME } from "shared/module";
import { Item } from "shared/Item";

const OpenChestEvent = ReplicatedStorage.Events.Inventory.OpenChest

const OresHealth = new Map<Instance, number>()
const OresHealthLookup = new Map<string, number>();

OresHealthLookup.set("Treasure", 100)
OresHealthLookup.set("Coal", 50)
OresHealthLookup.set("Bomb", 1)

function openTreasure(player: Player) {
    const tool = ReplicatedStorage.Tools.Sword.Clone()
    const chestContainer = new Instance("Model")

    tool.Parent = chestContainer;  
    chestContainer.Parent = player
    OpenChestEvent.FireClient(player, chestContainer)
}

let bombRadius = 15;

function explodeBomb(bombPosition: Vector3Value) {
    Workspace.Terrain.FillBall(bombPosition.Value, bombRadius, Enum.Material.Air)
}

class ShovelSwing extends SwingAbility {
    range = this.item.getAttribute("Range", 20)
    hardness = this.item.getAttribute("Hardness", 25)

    digRocks(position: Vector3) {
        const itemPosition = this.item.getPosition()
        const distance = itemPosition.sub(position).Magnitude

        const isInRange = distance < this.range
        if (isInRange)
            Workspace.Terrain.FillBall(position, 5, Enum.Material.Air)
    }

    digOre(instance: Vector3Value) {
        let health = OresHealth.get(instance) ?? OresHealthLookup.get(instance.Name)!
        health = math.max(0, health - this.hardness)
        if(health === 0) {
            OresHealth.delete(instance)
            const player = this.item.getOwnership()?.player
            if(instance.Name === "Treasure" && player) {
                openTreasure(player)
            }
            if(instance.Name === "Bomb") {
                task.delay(BOMB_EXPLOSION_TIME, () => {
                    explodeBomb(instance)
                })
            }
            instance.Destroy()   
            return;
        }
        OresHealth.set(instance, health)
    }

    onStart(): void {
        this.item.listenToEvent("Dig", (_position) => {
            if (typeIs(_position, "Vector3")) {
                this.digRocks(_position)
            } else if(typeIs(_position, "Instance") && _position.IsA("Vector3Value")) {
                this.digOre(_position)
            }
        })
        super.onStart()
    }
}

type Constraint = ReplicatedStorage["Tools"]["Shovel"]
export class ShovelItem extends ServerItem<Constraint> {
    constructor() {
        super(ReplicatedStorage.Tools.Shovel.Clone())
        this.abilityManager.add(new ShovelSwing(this));
    }
}