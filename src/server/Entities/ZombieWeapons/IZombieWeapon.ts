export interface IZombieWeapon {
    attackPlayer(dt: number): void
    attackFlag(): void
}