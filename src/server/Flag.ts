import { Workspace } from "@rbxts/services";

const flag = Workspace.Flag

export function damageFlag(quantity: number) {
    const newHealth = math.clamp(getFlagHealth() - quantity, 0, 100)
    flag.SetAttribute("Health", newHealth)
}

export function getFlagHealth() {
    return (flag.GetAttribute("Health") ?? 100) as number
}