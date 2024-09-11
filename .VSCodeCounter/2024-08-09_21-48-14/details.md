# Details

Date : 2024-08-09 21:48:14

Directory c:\\Users\\Tomas\\terrain2\\src

Total : 67 files,  2730 codes, 207 comments, 646 blanks, all 3583 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [src/client/CamShake.ts](/src/client/CamShake.ts) | TypeScript | 11 | 0 | 3 | 14 |
| [src/client/Events/OnCharacterAdded.ts](/src/client/Events/OnCharacterAdded.ts) | TypeScript | 6 | 0 | 3 | 9 |
| [src/client/Inventory/Inventory.ts](/src/client/Inventory/Inventory.ts) | TypeScript | 188 | 2 | 42 | 232 |
| [src/client/ItemAbility/BuildAbility.ts](/src/client/ItemAbility/BuildAbility.ts) | TypeScript | 82 | 1 | 14 | 97 |
| [src/client/ItemAbility/CraftAndBuildAbility.ts](/src/client/ItemAbility/CraftAndBuildAbility.ts) | TypeScript | 77 | 7 | 19 | 103 |
| [src/client/ItemAbility/PointAtAbility.ts](/src/client/ItemAbility/PointAtAbility.ts) | TypeScript | 58 | 3 | 16 | 77 |
| [src/client/ItemAbility/RotateAbility.ts](/src/client/ItemAbility/RotateAbility.ts) | TypeScript | 61 | 5 | 18 | 84 |
| [src/client/ItemAbility/SelfBuildAbility.ts](/src/client/ItemAbility/SelfBuildAbility.ts) | TypeScript | 23 | 0 | 4 | 27 |
| [src/client/ItemAbility/SwingAbility.ts](/src/client/ItemAbility/SwingAbility.ts) | TypeScript | 24 | 0 | 4 | 28 |
| [src/client/Item/AxeItem.ts](/src/client/Item/AxeItem.ts) | TypeScript | 14 | 0 | 1 | 15 |
| [src/client/Item/ClientItem.ts](/src/client/Item/ClientItem.ts) | TypeScript | 23 | 0 | 6 | 29 |
| [src/client/Item/Flint.ts](/src/client/Item/Flint.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [src/client/Item/Hammer.ts](/src/client/Item/Hammer.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/client/Item/ItemRegistrar.ts](/src/client/Item/ItemRegistrar.ts) | TypeScript | 32 | 0 | 5 | 37 |
| [src/client/Item/Rock.ts](/src/client/Item/Rock.ts) | TypeScript | 49 | 0 | 10 | 59 |
| [src/client/Item/Sword.ts](/src/client/Item/Sword.ts) | TypeScript | 12 | 3 | 3 | 18 |
| [src/client/Item/WaterBucket.ts](/src/client/Item/WaterBucket.ts) | TypeScript | 27 | 0 | 6 | 33 |
| [src/client/Movement/CharacterController.ts](/src/client/Movement/CharacterController.ts) | TypeScript | 53 | 0 | 11 | 64 |
| [src/client/Movement/Climbing.ts](/src/client/Movement/Climbing.ts) | TypeScript | 28 | 11 | 17 | 56 |
| [src/client/Notifications.ts](/src/client/Notifications.ts) | TypeScript | 43 | 0 | 9 | 52 |
| [src/client/SpinningItems.ts](/src/client/SpinningItems.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [src/client/Weather/Wind.ts](/src/client/Weather/Wind.ts) | TypeScript | 67 | 0 | 15 | 82 |
| [src/client/Weather/WindShake/Settings.lua](/src/client/Weather/WindShake/Settings.lua) | Lua | 62 | 4 | 17 | 83 |
| [src/client/Weather/WindShake/VectorMap.lua](/src/client/Weather/WindShake/VectorMap.lua) | Lua | 204 | 7 | 41 | 252 |
| [src/client/Weather/WindShake/WindShake.d.ts](/src/client/Weather/WindShake/WindShake.d.ts) | TypeScript | 22 | 36 | 11 | 69 |
| [src/client/Weather/WindShake/WindShake.lua](/src/client/Weather/WindShake/WindShake.lua) | Lua | 323 | 18 | 102 | 443 |
| [src/client/main.client.ts](/src/client/main.client.ts) | TypeScript | 8 | 0 | 0 | 8 |
| [src/server/Entities/Zombie.ts](/src/server/Entities/Zombie.ts) | TypeScript | 129 | 7 | 39 | 175 |
| [src/server/Flag.ts](/src/server/Flag.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/server/Inventory/DroppedItems.ts](/src/server/Inventory/DroppedItems.ts) | TypeScript | 21 | 0 | 3 | 24 |
| [src/server/Inventory/Inventory.ts](/src/server/Inventory/Inventory.ts) | TypeScript | 157 | 0 | 24 | 181 |
| [src/server/ItemAbilities/CollectAbility.ts](/src/server/ItemAbilities/CollectAbility.ts) | TypeScript | 70 | 0 | 17 | 87 |
| [src/server/ItemAbilities/Swing.ts](/src/server/ItemAbilities/Swing.ts) | TypeScript | 39 | 0 | 14 | 53 |
| [src/server/Item/Axe.ts](/src/server/Item/Axe.ts) | TypeScript | 14 | 0 | 1 | 15 |
| [src/server/Item/Flint.ts](/src/server/Item/Flint.ts) | TypeScript | 9 | 0 | 1 | 10 |
| [src/server/Item/Hammer.ts](/src/server/Item/Hammer.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [src/server/Item/ModelBinder.ts](/src/server/Item/ModelBinder.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/server/Item/Rock.ts](/src/server/Item/Rock.ts) | TypeScript | 33 | 0 | 6 | 39 |
| [src/server/Item/ServerItem.ts](/src/server/Item/ServerItem.ts) | TypeScript | 96 | 2 | 23 | 121 |
| [src/server/Item/Sword.ts](/src/server/Item/Sword.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [src/server/Item/WoodenWaterBucket.ts](/src/server/Item/WoodenWaterBucket.ts) | TypeScript | 33 | 0 | 5 | 38 |
| [src/server/PreloadAnimations.ts](/src/server/PreloadAnimations.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/server/Terrain/BiomeProp.ts](/src/server/Terrain/BiomeProp.ts) | TypeScript | 13 | 0 | 1 | 14 |
| [src/server/Terrain/Biomes/Desert.ts](/src/server/Terrain/Biomes/Desert.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/server/Terrain/Biomes/Muddy.ts](/src/server/Terrain/Biomes/Muddy.ts) | TypeScript | 14 | 0 | 2 | 16 |
| [src/server/Terrain/Biomes/Plains.ts](/src/server/Terrain/Biomes/Plains.ts) | TypeScript | 33 | 0 | 3 | 36 |
| [src/server/Terrain/Biomes/Rocky.ts](/src/server/Terrain/Biomes/Rocky.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [src/server/Terrain/Biomes/Sandy.ts](/src/server/Terrain/Biomes/Sandy.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [src/server/Terrain/Biomes/Snow.ts](/src/server/Terrain/Biomes/Snow.ts) | TypeScript | 38 | 0 | 6 | 44 |
| [src/server/Terrain/GenericBiome.ts](/src/server/Terrain/GenericBiome.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [src/server/Terrain/Main.ts](/src/server/Terrain/Main.ts) | TypeScript | 143 | 11 | 42 | 196 |
| [src/server/Terrain/StoneProp.ts](/src/server/Terrain/StoneProp.ts) | TypeScript | 19 | 0 | 3 | 22 |
| [src/server/TimeOfDay.ts](/src/server/TimeOfDay.ts) | TypeScript | 0 | 46 | 0 | 46 |
| [src/server/Weather.ts](/src/server/Weather.ts) | TypeScript | 45 | 0 | 10 | 55 |
| [src/server/main.server.ts](/src/server/main.server.ts) | TypeScript | 25 | 21 | 6 | 52 |
| [src/shared/Ability.ts](/src/shared/Ability.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [src/shared/AbilityManager.ts](/src/shared/AbilityManager.ts) | TypeScript | 6 | 0 | 3 | 9 |
| [src/shared/Array.ts](/src/shared/Array.ts) | TypeScript | 9 | 0 | 1 | 10 |
| [src/shared/Bezier.d.ts](/src/shared/Bezier.d.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [src/shared/Bezier.lua](/src/shared/Bezier.lua) | Lua | 5 | 0 | 2 | 7 |
| [src/shared/HashCode.ts](/src/shared/HashCode.ts) | TypeScript | 9 | 0 | 3 | 12 |
| [src/shared/InventoryData.ts](/src/shared/InventoryData.ts) | TypeScript | 2 | 0 | 0 | 2 |
| [src/shared/Item.ts](/src/shared/Item.ts) | TypeScript | 30 | 7 | 9 | 46 |
| [src/shared/NumberSequence.ts](/src/shared/NumberSequence.ts) | TypeScript | 18 | 0 | 4 | 22 |
| [src/shared/Recipes/HammerRecipes.ts](/src/shared/Recipes/HammerRecipes.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [src/shared/Recipes/Recipe.ts](/src/shared/Recipes/Recipe.ts) | TypeScript | 26 | 16 | 4 | 46 |
| [src/shared/module.ts](/src/shared/module.ts) | TypeScript | 3 | 0 | 1 | 4 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)