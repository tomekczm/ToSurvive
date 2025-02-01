interface ReplicatedStorage extends Instance {
	Aurora: Folder;
	Animations: Folder & {
		Climbing: Animation;
		Idle: Animation;
		Axe: Folder & {
			VM_Hold: Animation;
		};
		Right: Animation;
		Left: Animation;
		Hammer: Folder & {
			VM_Hold: Animation;
		};
		WalkBackwards: Animation;
		Walking: Animation;
		Zombie: Folder & {
			Idle: Animation;
			Kick: Folder & {
				Kick2: Animation;
				Kick1: Animation;
			};
			Punch: Folder & {
				Punch1: Animation;
				Punch2: Animation;
			};
			StandUp: Animation;
			Walk: Animation;
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["linked-lists"]: Folder & {
					out: ModuleScript & {
						classes: Folder & {
							lists: Folder & {
								SinglyLinkedList: ModuleScript;
								["reusable-tests"]: Folder & {
									CircularLinkedListTests: ModuleScript;
									SinglyLinkedListTests: ModuleScript;
									UniversalLinkedListTests: ModuleScript;
									DoublyLinkedListTests: ModuleScript;
									AcyclicLinkedListTests: ModuleScript;
								};
								CircularSinglyLinkedList: ModuleScript;
								CircularDoublyLinkedList: ModuleScript;
								DoublyLinkedList: ModuleScript;
							};
							nodes: Folder & {
								SinglyLinkedListNode: ModuleScript;
								DoublyLinkedListNode: ModuleScript;
							};
						};
						interfaces: Folder;
					};
				};
				["behavior-tree-5"]: ModuleScript & {
					BehaviorTreeCreator: ModuleScript;
					BehaviorTree3: ModuleScript;
				};
				services: ModuleScript;
				beacon: Folder & {
					out: ModuleScript;
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				["octo-tree"]: Folder & {
					out: ModuleScript;
				};
				["camera-shaker"]: Folder & {
					CameraShaker: ModuleScript & {
						CameraShakeInstance: ModuleScript;
						CameraShakePresets: ModuleScript;
					};
				};
				["raycast-hitbox"]: Folder & {
					src: ModuleScript & {
						HitboxCaster: ModuleScript;
						GoodSignal: ModuleScript;
						VisualizerCache: ModuleScript;
						Solvers: Folder & {
							Vector3: ModuleScript;
							Attachment: ModuleScript;
							LinkAttachments: ModuleScript;
							Bone: ModuleScript;
						};
					};
				};
				testez: Folder & {
					src: ModuleScript & {
						TestPlanner: ModuleScript;
						TestRunner: ModuleScript;
						TestBootstrap: ModuleScript;
						TestSession: ModuleScript;
						LifecycleHooks: ModuleScript;
						Reporters: Folder & {
							TextReporter: ModuleScript;
							TextReporterQuiet: ModuleScript;
							TeamCityReporter: ModuleScript;
						};
						TestPlan: ModuleScript;
						TestResults: ModuleScript;
						TestEnum: ModuleScript;
						Context: ModuleScript;
						Expectation: ModuleScript;
					};
				};
				nextcast: Folder & {
					out: ModuleScript & {
						errorMessages: ModuleScript;
						signal: ModuleScript;
						partCache: ModuleScript;
						caster: ModuleScript & {
							activeCast: ModuleScript;
						};
					};
				};
				janitor: Folder & {
					src: ModuleScript & {
						Promise: ModuleScript;
					};
				};
				rain: Folder & {
					src: ModuleScript;
				};
				geom: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							sift: Folder & {
								out: ModuleScript & {
									Dictionary: ModuleScript & {
										includes: ModuleScript;
										flip: ModuleScript;
										every: ModuleScript;
										update: ModuleScript;
										equalsDeep: ModuleScript;
										flatten: ModuleScript;
										copy: ModuleScript;
										mergeDeep: ModuleScript;
										values: ModuleScript;
										keys: ModuleScript;
										copyDeep: ModuleScript;
										some: ModuleScript;
										freeze: ModuleScript;
										map: ModuleScript;
										removeValue: ModuleScript;
										fromEntries: ModuleScript;
										freezeDeep: ModuleScript;
										set: ModuleScript;
										removeValues: ModuleScript;
										fromArrays: ModuleScript;
										entries: ModuleScript;
										removeKeys: ModuleScript;
										removeKey: ModuleScript;
										count: ModuleScript;
										filter: ModuleScript;
										has: ModuleScript;
										withKeys: ModuleScript;
										equals: ModuleScript;
										merge: ModuleScript;
									};
									Set: ModuleScript & {
										map: ModuleScript;
										["delete"]: ModuleScript;
										differenceSymmetric: ModuleScript;
										intersection: ModuleScript;
										fromArray: ModuleScript;
										toArray: ModuleScript;
										isSuperset: ModuleScript;
										merge: ModuleScript;
										copy: ModuleScript;
										count: ModuleScript;
										filter: ModuleScript;
										has: ModuleScript;
										isSubset: ModuleScript;
										difference: ModuleScript;
										add: ModuleScript;
									};
									Types: ModuleScript;
									Array: ModuleScript & {
										last: ModuleScript;
										shuffle: ModuleScript;
										is: ModuleScript;
										concatDeep: ModuleScript;
										update: ModuleScript;
										copy: ModuleScript;
										reduceRight: ModuleScript;
										copyDeep: ModuleScript;
										map: ModuleScript;
										removeValue: ModuleScript;
										equals: ModuleScript;
										first: ModuleScript;
										find: ModuleScript;
										removeIndex: ModuleScript;
										count: ModuleScript;
										reverse: ModuleScript;
										zipAll: ModuleScript;
										includes: ModuleScript;
										removeValues: ModuleScript;
										zip: ModuleScript;
										unshift: ModuleScript;
										toSet: ModuleScript;
										equalsDeep: ModuleScript;
										flatten: ModuleScript;
										splice: ModuleScript;
										sort: ModuleScript;
										difference: ModuleScript;
										freezeDeep: ModuleScript;
										slice: ModuleScript;
										findLast: ModuleScript;
										freeze: ModuleScript;
										findWhere: ModuleScript;
										removeIndices: ModuleScript;
										findWhereLast: ModuleScript;
										shift: ModuleScript;
										pop: ModuleScript;
										set: ModuleScript;
										create: ModuleScript;
										every: ModuleScript;
										at: ModuleScript;
										push: ModuleScript;
										insert: ModuleScript;
										filter: ModuleScript;
										differenceSymmetric: ModuleScript;
										concat: ModuleScript;
										reduce: ModuleScript;
										some: ModuleScript;
									};
									Util: ModuleScript & {
										equalObjects: ModuleScript;
										isEmpty: ModuleScript;
										func: ModuleScript;
									};
									None: ModuleScript;
								};
							};
						};
					};
					Output: ModuleScript & {
						Pack: ModuleScript;
						Math: ModuleScript;
						Utilities: ModuleScript;
						Algorithms: Folder & {
							Circumcircle: ModuleScript;
							Spring: ModuleScript;
							["Convex-Hull"]: ModuleScript;
							Bezier: ModuleScript;
							Voronoi: ModuleScript & {
								LuaFortune: Folder & {
									voronoi: ModuleScript;
									points: ModuleScript;
									bsp: ModuleScript;
								};
							};
						};
						Uniq: ModuleScript;
					};
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
			};
		};
	};
	Ores: Folder & {
		Treasure: Model & {
			Chest: Part & {
				PointLight: PointLight;
				Weld: Weld;
				Mesh: SpecialMesh;
			};
		};
		Coal: Model & {
			Core: MeshPart;
		};
		Bomb: Model & {
			Handle: Part & {
				["Bomb Explosion 1"]: Sound;
				Smoke: Attachment & {
					Smoke: ParticleEmitter;
				};
				["Bomb Fuse"]: Sound;
				EndPoint: Attachment;
				Attachment: Attachment;
				Mesh: SpecialMesh;
				MiddlePoint: Attachment;
			};
		};
	};
	Prefabs: Folder & {
		KeyHint: ImageLabel & {
			Key: TextLabel;
			Content: TextLabel;
		};
		Slot: ImageLabel & {
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
			Quantity: TextLabel;
		};
		Crow: Model & {
			GEO_RedtailHawk_01: MeshPart & {
				Root: Bone & {
					Body: Bone & {
						RightArm1_LoResClavical: Bone & {
							RightArm1_LoResUpperArm: Bone & {
								RightArm1_LoResLowerArm: Bone & {
									RightArm1_LoResHand: Bone;
								};
							};
						};
						RightLeg1_LoResUpperLeg: Bone & {
							RightLeg1_LoResLowerLeg: Bone & {
								RightLeg1_LoResFoot: Bone;
							};
						};
						Neck: Bone & {
							Head: Bone;
						};
						Tail: Bone;
						LeftArm1_LoResClavical: Bone & {
							LeftArm1_LoResUpperArm: Bone & {
								LeftArm1_LoResLowerArm: Bone & {
									LeftArm1_LoResHand: Bone;
								};
							};
						};
						LeftLeg1_LoResUpperLeg: Bone & {
							LeftLeg1_LoResLowerLeg: Bone & {
								LeftLeg1_LoResFoot: Bone;
							};
						};
					};
				};
				SurfaceAppearance: SurfaceAppearance;
			};
			InitialPoses: Folder & {
				GEO_RedtailHawk_01_Composited: CFrameValue;
				LeftLeg1_LoResToe_end_Composited: CFrameValue;
				Tail_Composited: CFrameValue;
				RightLeg1_LoResUpperLeg_Composited: CFrameValue;
				RightLeg1_LoResLowerLeg_Composited: CFrameValue;
				RightLeg1_LoResToe_end_Initial: CFrameValue;
				LeftLeg1_LoResToe_Composited: CFrameValue;
				LeftArm1_LoResClavical_Initial: CFrameValue;
				LeftLeg1_LoResFoot_Composited: CFrameValue;
				Neck_Initial: CFrameValue;
				RightArm1_LoResUpperArm_Composited: CFrameValue;
				RightLeg1_LoResUpperLeg_Original: CFrameValue;
				RightLeg1_LoResFoot_Original: CFrameValue;
				LeftLeg1_LoResToe_end_Initial: CFrameValue;
				Head_Initial: CFrameValue;
				LeftLeg1_LoResUpperLeg_Original: CFrameValue;
				LeftArm1_LoResClavical_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Original: CFrameValue;
				RightLeg1_LoResToe_end_Original: CFrameValue;
				RightLeg1_LoResToe_Initial: CFrameValue;
				LeftArm1_LoResHand_Initial: CFrameValue;
				Root_Initial: CFrameValue;
				Head_Composited: CFrameValue;
				Body_Initial: CFrameValue;
				LeftArm1_LoResLowerArm_Initial: CFrameValue;
				LeftLeg1_LoResUpperLeg_Composited: CFrameValue;
				LeftLeg1_LoResFoot_Original: CFrameValue;
				LeftArm1_LoResClavical_Composited: CFrameValue;
				RightLeg1_LoResToe_end_Composited: CFrameValue;
				Root_Original: CFrameValue;
				RightArm1_LoResClavical_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Initial: CFrameValue;
				LeftLeg1_LoResToe_Original: CFrameValue;
				Body_Original: CFrameValue;
				RightArm1_LoResUpperArm_Original: CFrameValue;
				LeftLeg1_LoResLowerLeg_Composited: CFrameValue;
				LeftLeg1_LoResFoot_Initial: CFrameValue;
				RightArm1_LoResUpperArm_Initial: CFrameValue;
				RightArm1_LoResClavical_Initial: CFrameValue;
				Body_Composited: CFrameValue;
				RightArm1_LoResHand_Initial: CFrameValue;
				Tail_Initial: CFrameValue;
				LeftArm1_LoResHand_Composited: CFrameValue;
				RightArm1_LoResLowerArm_Original: CFrameValue;
				LeftLeg1_LoResToe_end_Original: CFrameValue;
				LeftLeg1_LoResUpperLeg_Initial: CFrameValue;
				RightLeg1_LoResUpperLeg_Initial: CFrameValue;
				LeftArm1_LoResUpperArm_Initial: CFrameValue;
				Tail_Original: CFrameValue;
				Head_Original: CFrameValue;
				Neck_Original: CFrameValue;
				LeftArm1_LoResLowerArm_Original: CFrameValue;
				RightLeg1_LoResLowerLeg_Initial: CFrameValue;
				RightLeg1_LoResFoot_Initial: CFrameValue;
				RightArm1_LoResLowerArm_Initial: CFrameValue;
				GEO_RedtailHawk_01_Initial: CFrameValue;
				RightLeg1_LoResToe_Original: CFrameValue;
				LeftArm1_LoResUpperArm_Composited: CFrameValue;
				LeftArm1_LoResLowerArm_Composited: CFrameValue;
				LeftArm1_LoResUpperArm_Original: CFrameValue;
				RightLeg1_LoResToe_Composited: CFrameValue;
				RightArm1_LoResHand_Composited: CFrameValue;
				GEO_RedtailHawk_01_Original: CFrameValue;
				RightArm1_LoResLowerArm_Composited: CFrameValue;
				RightLeg1_LoResFoot_Composited: CFrameValue;
				RightLeg1_LoResLowerLeg_Original: CFrameValue;
				Neck_Composited: CFrameValue;
				RightArm1_LoResClavical_Composited: CFrameValue;
				LeftArm1_LoResHand_Original: CFrameValue;
				Root_Composited: CFrameValue;
				RightArm1_LoResHand_Original: CFrameValue;
				LeftLeg1_LoResToe_Initial: CFrameValue;
			};
			AnimationController: AnimationController & {
				Animator: Animator;
			};
		};
		SlotFrame: Frame & {
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
			Quantity: TextLabel;
		};
		CrowFlight: Folder & {
			FlyNormal: Animation;
			FlyPatterned: Animation;
		};
		SnowVFX: Part & {
			Snowfall: ParticleEmitter;
		};
	};
	Events: Folder & {
		Inventory: Folder & {
			QuantityChanged: RemoteEvent;
			OpenChest: RemoteEvent;
			SetSlot: RemoteEvent;
			SwapSlots: RemoteEvent;
			ForceUnequipMainSlot: RemoteEvent;
			EquipSlot: RemoteEvent;
		};
		CamShake: RemoteEvent;
		CreateItem: RemoteEvent;
		Building: Folder & {
			RecieveSerialized: RemoteEvent;
		};
		ApplyKnockback: RemoteEvent;
	};
	ItemAnimations: Folder & {
		Rock: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Axe: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Lantern: Folder & {
			Hold: Animation;
		};
		Sword: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Shovel: Folder & {
			Swing2: Animation;
			Swing: Animation;
			Hold: Animation;
		};
		Spear: Folder & {
			Swing2: Animation;
			PrepareThrow: Animation;
			Hold: Animation;
			Throw: Animation;
			Swing: Animation;
		};
	};
	Builds: Folder & {
		Campfire: Model & {
			Hitbox: Part;
			BuildingAttach: Part & {
				AddFuel: ProximityPrompt;
				Highlight: Highlight;
			};
		};
		["Wooden Water Bucket"]: Model & {
			RootPart: MeshPart & {
				PickUp: ProximityPrompt;
				Boiling: Sound;
				WashRock: ProximityPrompt;
				ParticleEmitter: ParticleEmitter;
			};
		};
		["Wooden Wall"]: Model;
	};
	Viewmodel: Model & {
		AnimationController: AnimationController & {
			Animator: Animator;
		};
		LeftArm: MeshPart & {
			Rig4Motor6D: Motor6D;
		};
		RightHand: MeshPart & {
			Rig3Motor6D: Motor6D;
			RigidConstraint: RigidConstraint;
		};
		HumanoidRootPart: Part & {
			ClimbSensor: ControllerPartSensor;
			BuoyancySensor: BuoyancySensor;
			GroundSensor: ControllerPartSensor;
			["mixamorig:Hips"]: Bone & {
				["mixamorig:LeftUpLeg"]: Bone & {
					["mixamorig:LeftLeg"]: Bone & {
						["mixamorig:LeftFoot"]: Bone & {
							["mixamorig:LeftToeBase"]: Bone;
						};
					};
				};
				["mixamorig:RightUpLeg"]: Bone & {
					["mixamorig:RightLeg"]: Bone & {
						["mixamorig:RightFoot"]: Bone & {
							["mixamorig:RightToeBase"]: Bone;
						};
					};
				};
				["mixamorig:Spine"]: Bone & {
					["mixamorig:Spine1"]: Bone & {
						["mixamorig:Spine2"]: Bone & {
							["mixamorig:RightShoulder"]: Bone & {
								["mixamorig:RightArm"]: Bone & {
									["mixamorig:RightForeArm"]: Bone & {
										["mixamorig:RightHand"]: Bone & {
											RightAttachBone: Bone;
										};
									};
								};
							};
							["mixamorig:Neck"]: Bone & {
								["mixamorig:Head"]: Bone;
							};
							["mixamorig:LeftShoulder"]: Bone & {
								["mixamorig:LeftArm"]: Bone & {
									["mixamorig:LeftForeArm"]: Bone & {
										["mixamorig:LeftHand"]: Bone & {
											LeftAttachBone: Bone;
										};
									};
								};
							};
						};
					};
				};
			};
		};
		AnimSaves: ObjectValue;
	};
	Tools: Folder & {
		Rock: Model & {
			RootPart: MeshPart & {
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		Axe: Model & {
			RootPart: Part & {
				AlternativeHan2d: Attachment;
				Attachment: Attachment;
				Mesh: SpecialMesh;
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		Lantern: Model & {
			RootPart: MeshPart & {
				Attachment: Attachment;
				WeldConstraint: WeldConstraint;
			};
			["Cube.030"]: MeshPart & {
				PointLight: PointLight;
			};
		};
		Sword: Model & {
			SurfaceAppearance: SurfaceAppearance;
			Events: Folder & {
				Hit: RemoteEvent;
				Swing: RemoteEvent;
			};
			RootPart: Part & {
				Attachment: Attachment;
				Mesh: SpecialMesh;
			};
		};
		Spear: Model & {
			RootPart: MeshPart & {
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
				Throw: RemoteEvent;
				Hit: RemoteEvent;
				PrepareThrow: RemoteEvent;
				ThrowStop: RemoteEvent;
			};
		};
		Hammer: Model & {
			RootPart: Part & {
				Mesh: SpecialMesh;
				Attachment: Attachment;
			};
			Events: Folder & {
				Build: RemoteEvent;
			};
		};
		Flint: Model & {
			RootPart: MeshPart & {
				HitPoint: Attachment & {
					Sound: Sound & {
						Modifier: PitchShiftSoundEffect;
					};
				};
				Attachment: Attachment;
			};
			Events: Folder & {
				Swing: RemoteEvent;
			};
		};
		["Wooden Log"]: Model & {
			RootPart: Part & {
				Attachment: Attachment;
			};
		};
		["Wooden Water Bucket"]: Model & {
			Events: Folder & {
				Build: RemoteEvent;
			};
			RootPart: MeshPart & {
				Attachment: Attachment;
			};
		};
		Meat: Model & {
			RootPart: MeshPart & {
				Attachment: Attachment;
			};
		};
		Shovel: Model & {
			MeshPart: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
			};
			RootPart: MeshPart & {
				SurfaceAppearance: SurfaceAppearance;
				Attachment: Attachment;
				WeldConstraint: WeldConstraint;
			};
			Events: Folder & {
				Dig: RemoteEvent;
				Swing: RemoteEvent;
			};
		};
	};
	TS: Folder & {
		module: ModuleScript;
		NumberSequence: ModuleScript;
		Ability: ModuleScript;
		Recipes: Folder & {
			Recipe: ModuleScript;
			HammerRecipes: ModuleScript;
		};
		HashCode: ModuleScript;
		Sound: ModuleScript;
		Bezier: ModuleScript;
		Item: ModuleScript;
		TwoWayMap: ModuleScript;
		InventoryData: ModuleScript;
		Array: ModuleScript;
		VFX: ModuleScript;
		AbilityManager: ModuleScript;
	};
}
