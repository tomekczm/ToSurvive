interface ReplicatedStorage extends Instance {
	Animations: Folder & {
		Climbing: Animation;
		Idle: Animation;
		Walking: Animation;
	};
	TS: Folder & {
		module: ModuleScript;
		Array: ModuleScript;
		Item: ModuleScript;
		AbilityManager: ModuleScript;
	};
	Events: Folder & {
		CreateItem: RemoteEvent;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
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
