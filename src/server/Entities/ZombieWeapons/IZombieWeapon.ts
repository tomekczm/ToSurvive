export interface IZombieWeapon {

    stateUpdated(state: string): void

    attackPlayer(dt: number): void
    attackFlag(): void
    attackBuilding(): void
}