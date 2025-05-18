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

interface PlayerCharacter extends Entity {}

interface Player {
    character?: PlayerCharacter
}

interface LocalPlayer extends Player {
    inFirstPerson: boolean
}

interface Players {
    readonly LocalPlayer: LocalPlayer
}

interface Array<T> {
    Sample(): T
    SamplePop(): T | undefined
}

interface Mouse {
    GetTarget(params?: RaycastParams): RaycastResult
}