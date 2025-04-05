interface Random {
    Sample<T>(arr: T[]): T
}

interface Sound {
    PlaySound(from: number | undefined, to: number  | undefined): void
}

interface EntityController {
    attackedByPlayer(model: Model | undefined): void
}

interface Entity extends Model {
    Knockback(source: Vector3, power: number): void
    Damage(dmg: number): void
    controller: EntityController
    alive: boolean
}

interface PlayerCharacter extends Entity {
    Knockback(source: Vector3, power: number): void
}

interface Player {
    character?: PlayerCharacter
}