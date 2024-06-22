interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
		Item: ModuleScript;
		NumberSequence: ModuleScript;
		Ability: ModuleScript;
		Array: ModuleScript;
		HashCode: ModuleScript;
		AbilityManager: ModuleScript;
	};
	Events: Folder & {
		CreateItem: RemoteEvent;
		Inventory: Folder & {
			EquipSlot: RemoteEvent;
		};
	};
	Animations: Folder & {
		Climbing: Animation;
		Idle: Animation;
		Walking: Animation;
	};
	Prefabs: Folder & {
		Slot: TextBox;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["behavior-tree-5"]: ModuleScript & {
					BehaviorTreeCreator: ModuleScript;
					BehaviorTree3: ModuleScript;
				};
				services: ModuleScript;
				["compiler-types"]: Folder & {
					types: Folder;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
			};
		};
	};
}
