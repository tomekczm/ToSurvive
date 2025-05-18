import { Workspace } from "@rbxts/services";

const flag = Workspace.Flag

export const Flag = {
    getHealth() {
        return (flag.GetAttribute("Health") ?? 100) as number
    },
    damage(quantity: number) {
        const newHealth = math.clamp(Flag.getHealth() - quantity, 0, 100)
        flag.SetAttribute("Health", newHealth)
    }
} 