interface ServerStorage extends Instance {
	Models: Folder & {
		Plains: Folder & {
			Tree3: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree1: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree2: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			MultiRock: Model;
		};
		Ragdoll: Model & {
			LeftLowerArm: MeshPart & {
				Attachment1: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment0: Attachment;
			};
			RightUpperArm: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			Head: Part & {
				Mesh: SpecialMesh;
				Attachment1: Attachment;
			};
			UpperTorso: MeshPart & {
				RShoulder: Attachment;
				LShoulder: Attachment;
				Attachment1: Attachment;
			};
			RightHand: MeshPart & {
				Attachment1: Attachment;
			};
			LowerTorso: MeshPart & {
				HingeConstraint: HingeConstraint;
			};
			LeftUpperLeg: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			LeftUpperArm: MeshPart & {
				Attachment1: Attachment;
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
			};
			RightLowerArm: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
			LeftHand: MeshPart & {
				Attachment1: Attachment;
			};
			RightUpperLeg: MeshPart & {
				HingeConstraint: HingeConstraint;
				Attachment0: Attachment;
				Attachment1: Attachment;
			};
			LeftFoot: MeshPart & {
				Attachment1: Attachment;
			};
			RightLowerLeg: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
			RightFoot: MeshPart & {
				Attachment1: Attachment;
			};
			LeftLowerLeg: MeshPart & {
				Attachment0: Attachment;
				BallSocketConstraint: BallSocketConstraint;
				Attachment1: Attachment;
			};
		};
		IceBiome: Folder & {
			Tree1: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			Tree2: Model & {
				Leaves: MeshPart;
				Trunk: MeshPart;
			};
			MultiRock: Model;
		};
		Soul: Model & {
			SoulFragment: Part & {
				PickUp: ProximityPrompt;
				Value: ObjectValue;
				ParticleEmitter: ParticleEmitter;
			};
			Value: ObjectValue;
		};
		Flowers: Model & {
			Top: MeshPart & {
				CanColor: BoolValue;
			};
			["Cube.090"]: MeshPart;
			["Cylinder.023"]: MeshPart;
		};
		BlackBiome: Folder & {
			DeadTree: Model & {
				Part: Part;
				MeshPart: MeshPart;
			};
		};
		Spear: MeshPart & {
			PickUp: ProximityPrompt;
		};
		Cat: Model & {
			HumanoidRootPart: Part & {
				LeftEye: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
				["Turkish Man Yelling Meow meme"]: Sound;
				["Cat Meowing Sounds"]: Sound;
				ParticleEmitter: ParticleEmitter;
				Meow: Sound;
				["Meow 3"]: Sound;
				Mesh: SpecialMesh;
				RightEye: Attachment & {
					ParticleEmitter: ParticleEmitter;
				};
			};
			Humanoid: Humanoid;
		};
		Desert: Folder & {
			SandRock: Model;
		};
		SmallRocks: Folder & {
			SmallRock2: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
			SmallRock3: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
			SmallRock1: Model & {
				BasePart: MeshPart & {
					PickUp: ProximityPrompt;
				};
			};
		};
		Fire: Model & {
			Burnoff: Part & {
				FireSound: Sound;
				Smoke: ParticleEmitter;
			};
		};
		ZombieModel: Model & {
			Humanoid: Humanoid & {
				Animator: Animator;
			};
			Head: MeshPart & {
				Rig6Motor6D: Motor6D;
			};
			RightHand: MeshPart & {
				RigidConstraint: RigidConstraint;
				Rig3Motor6D: Motor6D;
			};
			LeftAttach: IKControl;
			IKControl: IKControl;
			AnimSaves: ObjectValue;
			LeftArm: MeshPart & {
				Rig4Motor6D: Motor6D;
			};
			Torso: MeshPart & {
				Rig5Motor6D: Motor6D;
			};
			RightLeg: MeshPart & {
				Rig1Motor6D: Motor6D;
			};
			HumanoidRootPart: Part & {
				Attachment: Attachment;
				GroundSensor: ControllerPartSensor;
				ClimbSensor: ControllerPartSensor;
				BuoyancySensor: BuoyancySensor;
				WeldConstraint: WeldConstraint;
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
												DmgPoint: Attachment;
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
												DmgPoint: Attachment;
											};
										};
									};
								};
							};
						};
					};
				};
			};
			LeftLeg: MeshPart & {
				Rig2Motor6D: Motor6D;
			};
		};
		Cow: Model & {
			HumanoidRootPart: MeshPart;
			Humanoid: Humanoid;
		};
	};
	Structures: Folder & {
		Yard_Wall: Model & {
			Yard_Wall_Cement: MeshPart;
		};
		Village: Folder & {
			Core: Folder & {
				Base: Model & {
					HerbGardenBricks: Model;
					Herb_garden: Model;
					BasePart: Part;
				};
			};
			Decorations: Folder & {
				["Tall Acid Candle"]: Model & {
					["Cylinder.002"]: MeshPart;
					["Cylinder.003"]: MeshPart & {
						Attachment: Attachment & {
							ParticleEmitter: ParticleEmitter;
						};
					};
					Cylinder: MeshPart;
				};
				["Acid Lantern"]: Model & {
					["Cube.030"]: MeshPart & {
						PointLight: PointLight;
					};
					["Cube.017"]: MeshPart;
				};
			};
			Model: Model & {
				Crosspath: Model & {
					Part: Part;
					BasePart: Part & {
						StreetConnecto2r: Attachment;
					};
				};
				Path_Long: Model & {
					Part: Part & {
						StreetConnector: Attachment;
					};
				};
				Path_Short: Model & {
					Part: Part & {
						StreetConnector: Attachment;
					};
				};
				Path_Middle: Model & {
					Part: Part & {
						StreetConnector: Attachment;
					};
				};
				Path2: Model;
				Path3: Model;
			};
			Paths: Folder & {
				StreetConnector: Model & {
					Path: MeshPart & {
						["Point.089"]: Bone;
						["Point.158"]: Bone;
						["Point.025"]: Bone;
						["Point.124"]: Bone;
						["Point.258"]: Bone;
						["Point.154"]: Bone;
						["Point.194"]: Bone;
						["Point.058"]: Bone;
						["Point.211"]: Bone;
						["Point.236"]: Bone;
						["Point.021"]: Bone;
						["Point.243"]: Bone;
						["Point.062"]: Bone;
						["Point.008"]: Bone;
						["Point.264"]: Bone;
						["Point.052"]: Bone;
						["Point.123"]: Bone;
						["Point.099"]: Bone;
						["Point.119"]: Bone;
						["Point.260"]: Bone;
						["Point.137"]: Bone;
						["Point.172"]: Bone;
						["Point.173"]: Bone;
						["Point.148"]: Bone;
						["Point.220"]: Bone;
						["Point.098"]: Bone;
						["Point.164"]: Bone;
						["Point.208"]: Bone;
						["Point.094"]: Bone;
						["Point.077"]: Bone;
						["Point.149"]: Bone;
						["Point.122"]: Bone;
						["Point.202"]: Bone;
						["Point.036"]: Bone;
						["Point.076"]: Bone;
						["Point.199"]: Bone;
						["Point.132"]: Bone;
						["Point.187"]: Bone;
						["Point.101"]: Bone;
						["Point.102"]: Bone;
						["Point.256"]: Bone;
						["Point.232"]: Bone;
						["Point.090"]: Bone;
						["Point.186"]: Bone;
						["Point.050"]: Bone;
						["Point.133"]: Bone;
						["Point.189"]: Bone;
						["Point.228"]: Bone;
						["Point.039"]: Bone;
						["Point.143"]: Bone;
						["Point.234"]: Bone;
						["Point.152"]: Bone;
						["Point.155"]: Bone;
						["Point.288"]: Bone;
						["Point.218"]: Bone;
						["Point.082"]: Bone;
						["Point.193"]: Bone;
						["Point.163"]: Bone;
						["Point.245"]: Bone;
						["Point.286"]: Bone;
						["Point.146"]: Bone;
						["Point.125"]: Bone;
						["Point.179"]: Bone;
						["Point.136"]: Bone;
						["Point.237"]: Bone;
						["Point.222"]: Bone;
						["Point.015"]: Bone;
						["Point.035"]: Bone;
						["Point.053"]: Bone;
						["Point.134"]: Bone;
						["Point.262"]: Bone;
						["Point.276"]: Bone;
						["Point.011"]: Bone;
						["Point.126"]: Bone;
						["Point.023"]: Bone;
						["Point.140"]: Bone;
						["Point.167"]: Bone;
						["Point.190"]: Bone;
						["Point.079"]: Bone;
						["Point.274"]: Bone;
						["Point.117"]: Bone;
						["Point.080"]: Bone;
						["Point.201"]: Bone;
						["Point.068"]: Bone;
						["Point.083"]: Bone;
						["Point.221"]: Bone;
						["Point.225"]: Bone;
						["Point.057"]: Bone;
						["Point.192"]: Bone;
						["Point.196"]: Bone;
						["Point.275"]: Bone;
						["Point.054"]: Bone;
						["Point.178"]: Bone;
						["Point.045"]: Bone;
						["Point.072"]: Bone;
						["Point.271"]: Bone;
						["Point.184"]: Bone;
						["Point.161"]: Bone;
						["Point.151"]: Bone;
						["Point.153"]: Bone;
						["Point.084"]: Bone;
						["Point.020"]: Bone;
						["Point.278"]: Bone;
						["Point.227"]: Bone;
						["Point.279"]: Bone;
						["Point.282"]: Bone;
						["Point.027"]: Bone;
						["Point.180"]: Bone;
						["Point.272"]: Bone;
						["Point.289"]: Bone;
						["Point.032"]: Bone;
						["Point.169"]: Bone;
						["Point.238"]: Bone;
						["Point.043"]: Bone;
						["Point.128"]: Bone;
						["Point.105"]: Bone;
						["Point.114"]: Bone;
						["Point.069"]: Bone;
						["Point.121"]: Bone;
						["Point.070"]: Bone;
						["Point.135"]: Bone;
						["Point.095"]: Bone;
						["Point.006"]: Bone;
						["Point.171"]: Bone;
						["Point.013"]: Bone;
						["Point.092"]: Bone;
						["Point.118"]: Bone;
						["Point.241"]: Bone;
						["Point.129"]: Bone;
						["Point.074"]: Bone;
						["Point.273"]: Bone;
						["Point.086"]: Bone;
						["Point.165"]: Bone;
						["Point.144"]: Bone;
						["Point.109"]: Bone;
						["Point.283"]: Bone;
						["Point.088"]: Bone;
						["Point.138"]: Bone;
						["Point.183"]: Bone;
						["Point.014"]: Bone;
						["Point.255"]: Bone;
						["Point.159"]: Bone;
						["Point.263"]: Bone;
						["Point.067"]: Bone;
						["Point.104"]: Bone;
						["Point.016"]: Bone;
						["Point.034"]: Bone;
						["Point.213"]: Bone;
						["Point.012"]: Bone;
						["Point.259"]: Bone;
						["Point.073"]: Bone;
						["Point.209"]: Bone;
						["Point.056"]: Bone;
						["Point.203"]: Bone;
						["Point.230"]: Bone;
						["Point.226"]: Bone;
						["Point.253"]: Bone;
						["Point.037"]: Bone;
						["Point.093"]: Bone;
						["Point.096"]: Bone;
						["Point.188"]: Bone;
						["Point.131"]: Bone;
						["Point.174"]: Bone;
						["Point.051"]: Bone;
						["Point.277"]: Bone;
						["Point.280"]: Bone;
						["Point.170"]: Bone;
						["Point.001"]: Bone;
						["Point.002"]: Bone;
						["Point.139"]: Bone;
						["Point.214"]: Bone;
						["Point.003"]: Bone;
						["Point.004"]: Bone;
						["Point.005"]: Bone;
						["Point.142"]: Bone;
						["Point.007"]: Bone;
						["Point.009"]: Bone;
						["Point.240"]: Bone;
						["Point.175"]: Bone;
						["Point.018"]: Bone;
						["Point.019"]: Bone;
						["Point.055"]: Bone;
						["Point.150"]: Bone;
						["Point.160"]: Bone;
						["Point.115"]: Bone;
						["Point.026"]: Bone;
						["Point.219"]: Bone;
						["Point.010"]: Bone;
						["Point.204"]: Bone;
						["Point.110"]: Bone;
						["Point.029"]: Bone;
						["Point.030"]: Bone;
						["Point.233"]: Bone;
						["Point.031"]: Bone;
						["Point.033"]: Bone;
						["Point.081"]: Bone;
						["Point.120"]: Bone;
						["Point.212"]: Bone;
						["Point.106"]: Bone;
						["Point.066"]: Bone;
						["Point.038"]: Bone;
						["Point.257"]: Bone;
						["Point.040"]: Bone;
						["Point.049"]: Bone;
						["Point.216"]: Bone;
						["Point.041"]: Bone;
						["Point.042"]: Bone;
						["Point.210"]: Bone;
						["Point.248"]: Bone;
						["Point.207"]: Bone;
						["Point.252"]: Bone;
						["Point.145"]: Bone;
						["Point.166"]: Bone;
						["Point.046"]: Bone;
						["Point.028"]: Bone;
						["Point.285"]: Bone;
						["Point.116"]: Bone;
						["Point.287"]: Bone;
						["Point.223"]: Bone;
						["Point.242"]: Bone;
						["Point.047"]: Bone;
						["Point.235"]: Bone;
						["Point.157"]: Bone;
						["Point.048"]: Bone;
						["Point.197"]: Bone;
						["Point.246"]: Bone;
						["Point.284"]: Bone;
						["Point.239"]: Bone;
						["Point.231"]: Bone;
						["Point.265"]: Bone;
						["Point.168"]: Bone;
						["Point.022"]: Bone;
						["Point.017"]: Bone;
						["Point.281"]: Bone;
						["Point.059"]: Bone;
						["Point.191"]: Bone;
						["Point.060"]: Bone;
						["Point.244"]: Bone;
						["Point.061"]: Bone;
						["Point.063"]: Bone;
						["Point.064"]: Bone;
						["Point.268"]: Bone;
						["Point.181"]: Bone;
						["Point.147"]: Bone;
						["Point.065"]: Bone;
						["Point.085"]: Bone;
						["Point.176"]: Bone;
						["Point.071"]: Bone;
						["Point.141"]: Bone;
						["Point.251"]: Bone;
						["Point.215"]: Bone;
						["Point.075"]: Bone;
						["Point.254"]: Bone;
						["Point.078"]: Bone;
						["Point.200"]: Bone;
						["Point.195"]: Bone;
						["Point.044"]: Bone;
						["Point.270"]: Bone;
						["Point.177"]: Bone;
						["Point.087"]: Bone;
						["Point.091"]: Bone;
						["Point.097"]: Bone;
						["Point.269"]: Bone;
						["Point.247"]: Bone;
						["Point.100"]: Bone;
						["Point.103"]: Bone;
						["Point.185"]: Bone;
						["Point.107"]: Bone;
						["Point.108"]: Bone;
						["Point.229"]: Bone;
						["Point.111"]: Bone;
						["Point.249"]: Bone;
						["Point.112"]: Bone;
						["Point.250"]: Bone;
						["Point.266"]: Bone;
						["Point.113"]: Bone;
						["Point.024"]: Bone;
						["Point.127"]: Bone;
						["Point.130"]: Bone;
						["Point.182"]: Bone;
						["Point.224"]: Bone;
						["Point.217"]: Bone;
						["Point.261"]: Bone;
						["Point.205"]: Bone;
						["Point.156"]: Bone;
						["Point.162"]: Bone;
						["Point.267"]: Bone;
						["Point.206"]: Bone;
						["Point.198"]: Bone;
					};
				};
				StraightPath: Model & {
					Path: MeshPart & {
						["Point.089"]: Bone;
						["Point.158"]: Bone;
						["Point.025"]: Bone;
						["Point.124"]: Bone;
						["Point.258"]: Bone;
						["Point.154"]: Bone;
						["Point.194"]: Bone;
						["Point.058"]: Bone;
						["Point.211"]: Bone;
						["Point.236"]: Bone;
						["Point.021"]: Bone;
						["Point.243"]: Bone;
						["Point.062"]: Bone;
						["Point.008"]: Bone;
						["Point.264"]: Bone;
						["Point.052"]: Bone;
						["Point.123"]: Bone;
						["Point.099"]: Bone;
						["Point.119"]: Bone;
						["Point.260"]: Bone;
						["Point.137"]: Bone;
						["Point.172"]: Bone;
						["Point.173"]: Bone;
						["Point.148"]: Bone;
						["Point.220"]: Bone;
						["Point.098"]: Bone;
						["Point.164"]: Bone;
						["Point.208"]: Bone;
						["Point.094"]: Bone;
						["Point.077"]: Bone;
						["Point.149"]: Bone;
						["Point.122"]: Bone;
						["Point.202"]: Bone;
						["Point.036"]: Bone;
						["Point.076"]: Bone;
						["Point.199"]: Bone;
						["Point.132"]: Bone;
						["Point.187"]: Bone;
						["Point.101"]: Bone;
						["Point.102"]: Bone;
						["Point.256"]: Bone;
						["Point.232"]: Bone;
						["Point.090"]: Bone;
						["Point.186"]: Bone;
						["Point.050"]: Bone;
						["Point.133"]: Bone;
						["Point.189"]: Bone;
						["Point.228"]: Bone;
						["Point.039"]: Bone;
						["Point.143"]: Bone;
						["Point.234"]: Bone;
						["Point.152"]: Bone;
						["Point.155"]: Bone;
						["Point.288"]: Bone;
						["Point.218"]: Bone;
						["Point.082"]: Bone;
						["Point.193"]: Bone;
						["Point.163"]: Bone;
						["Point.245"]: Bone;
						["Point.286"]: Bone;
						["Point.146"]: Bone;
						["Point.125"]: Bone;
						["Point.179"]: Bone;
						["Point.136"]: Bone;
						["Point.237"]: Bone;
						["Point.222"]: Bone;
						["Point.015"]: Bone;
						["Point.035"]: Bone;
						["Point.053"]: Bone;
						["Point.134"]: Bone;
						["Point.262"]: Bone;
						["Point.276"]: Bone;
						["Point.011"]: Bone;
						["Point.126"]: Bone;
						["Point.023"]: Bone;
						["Point.140"]: Bone;
						["Point.167"]: Bone;
						["Point.190"]: Bone;
						["Point.079"]: Bone;
						["Point.274"]: Bone;
						["Point.117"]: Bone;
						["Point.080"]: Bone;
						["Point.201"]: Bone;
						["Point.068"]: Bone;
						["Point.083"]: Bone;
						["Point.221"]: Bone;
						["Point.225"]: Bone;
						["Point.057"]: Bone;
						["Point.192"]: Bone;
						["Point.196"]: Bone;
						["Point.275"]: Bone;
						["Point.054"]: Bone;
						["Point.178"]: Bone;
						["Point.045"]: Bone;
						["Point.072"]: Bone;
						["Point.271"]: Bone;
						["Point.184"]: Bone;
						["Point.161"]: Bone;
						["Point.151"]: Bone;
						["Point.153"]: Bone;
						["Point.084"]: Bone;
						["Point.020"]: Bone;
						["Point.278"]: Bone;
						["Point.227"]: Bone;
						["Point.279"]: Bone;
						["Point.282"]: Bone;
						["Point.027"]: Bone;
						["Point.180"]: Bone;
						["Point.272"]: Bone;
						["Point.289"]: Bone;
						["Point.032"]: Bone;
						["Point.169"]: Bone;
						["Point.238"]: Bone;
						["Point.043"]: Bone;
						["Point.128"]: Bone;
						["Point.105"]: Bone;
						["Point.114"]: Bone;
						["Point.069"]: Bone;
						["Point.121"]: Bone;
						["Point.070"]: Bone;
						["Point.135"]: Bone;
						["Point.095"]: Bone;
						["Point.006"]: Bone;
						["Point.171"]: Bone;
						["Point.013"]: Bone;
						["Point.092"]: Bone;
						["Point.118"]: Bone;
						["Point.241"]: Bone;
						["Point.129"]: Bone;
						["Point.074"]: Bone;
						["Point.273"]: Bone;
						["Point.086"]: Bone;
						["Point.165"]: Bone;
						["Point.144"]: Bone;
						["Point.109"]: Bone;
						["Point.283"]: Bone;
						["Point.088"]: Bone;
						["Point.138"]: Bone;
						["Point.183"]: Bone;
						["Point.014"]: Bone;
						["Point.255"]: Bone;
						["Point.159"]: Bone;
						["Point.263"]: Bone;
						["Point.067"]: Bone;
						["Point.104"]: Bone;
						["Point.016"]: Bone;
						["Point.034"]: Bone;
						["Point.213"]: Bone;
						["Point.012"]: Bone;
						["Point.259"]: Bone;
						["Point.073"]: Bone;
						["Point.209"]: Bone;
						["Point.056"]: Bone;
						["Point.203"]: Bone;
						["Point.230"]: Bone;
						["Point.226"]: Bone;
						["Point.253"]: Bone;
						["Point.037"]: Bone;
						["Point.093"]: Bone;
						["Point.096"]: Bone;
						["Point.188"]: Bone;
						["Point.131"]: Bone;
						["Point.174"]: Bone;
						["Point.051"]: Bone;
						["Point.277"]: Bone;
						["Point.280"]: Bone;
						["Point.170"]: Bone;
						["Point.001"]: Bone;
						["Point.002"]: Bone;
						["Point.139"]: Bone;
						["Point.214"]: Bone;
						["Point.003"]: Bone;
						["Point.004"]: Bone;
						["Point.005"]: Bone;
						["Point.142"]: Bone;
						["Point.007"]: Bone;
						["Point.009"]: Bone;
						["Point.240"]: Bone;
						["Point.175"]: Bone;
						["Point.018"]: Bone;
						["Point.019"]: Bone;
						["Point.055"]: Bone;
						["Point.150"]: Bone;
						["Point.160"]: Bone;
						["Point.115"]: Bone;
						["Point.026"]: Bone;
						["Point.219"]: Bone;
						["Point.010"]: Bone;
						["Point.204"]: Bone;
						["Point.110"]: Bone;
						["Point.029"]: Bone;
						["Point.030"]: Bone;
						["Point.233"]: Bone;
						["Point.031"]: Bone;
						["Point.033"]: Bone;
						["Point.081"]: Bone;
						["Point.120"]: Bone;
						["Point.212"]: Bone;
						["Point.106"]: Bone;
						["Point.066"]: Bone;
						["Point.038"]: Bone;
						["Point.257"]: Bone;
						["Point.040"]: Bone;
						["Point.049"]: Bone;
						["Point.216"]: Bone;
						["Point.041"]: Bone;
						["Point.042"]: Bone;
						["Point.210"]: Bone;
						["Point.248"]: Bone;
						["Point.207"]: Bone;
						["Point.252"]: Bone;
						["Point.145"]: Bone;
						["Point.166"]: Bone;
						["Point.046"]: Bone;
						["Point.028"]: Bone;
						["Point.285"]: Bone;
						["Point.116"]: Bone;
						["Point.287"]: Bone;
						["Point.223"]: Bone;
						["Point.242"]: Bone;
						["Point.047"]: Bone;
						["Point.235"]: Bone;
						["Point.157"]: Bone;
						["Point.048"]: Bone;
						["Point.197"]: Bone;
						["Point.246"]: Bone;
						["Point.284"]: Bone;
						["Point.239"]: Bone;
						["Point.231"]: Bone;
						["Point.265"]: Bone;
						["Point.168"]: Bone;
						["Point.022"]: Bone;
						["Point.017"]: Bone;
						["Point.281"]: Bone;
						["Point.059"]: Bone;
						["Point.191"]: Bone;
						["Point.060"]: Bone;
						["Point.244"]: Bone;
						["Point.061"]: Bone;
						["Point.063"]: Bone;
						["Point.064"]: Bone;
						["Point.268"]: Bone;
						["Point.181"]: Bone;
						["Point.147"]: Bone;
						["Point.065"]: Bone;
						["Point.085"]: Bone;
						["Point.176"]: Bone;
						["Point.071"]: Bone;
						["Point.141"]: Bone;
						["Point.251"]: Bone;
						["Point.215"]: Bone;
						["Point.075"]: Bone;
						["Point.254"]: Bone;
						["Point.078"]: Bone;
						["Point.200"]: Bone;
						["Point.195"]: Bone;
						["Point.044"]: Bone;
						["Point.270"]: Bone;
						["Point.177"]: Bone;
						["Point.087"]: Bone;
						["Point.091"]: Bone;
						["Point.097"]: Bone;
						["Point.269"]: Bone;
						["Point.247"]: Bone;
						["Point.100"]: Bone;
						["Point.103"]: Bone;
						["Point.185"]: Bone;
						["Point.107"]: Bone;
						["Point.108"]: Bone;
						["Point.229"]: Bone;
						["Point.111"]: Bone;
						["Point.249"]: Bone;
						["Point.112"]: Bone;
						["Point.250"]: Bone;
						["Point.266"]: Bone;
						["Point.113"]: Bone;
						["Point.024"]: Bone;
						["Point.127"]: Bone;
						["Point.130"]: Bone;
						["Point.182"]: Bone;
						["Point.224"]: Bone;
						["Point.217"]: Bone;
						["Point.261"]: Bone;
						["Point.205"]: Bone;
						["Point.156"]: Bone;
						["Point.162"]: Bone;
						["Point.267"]: Bone;
						["Point.206"]: Bone;
						["Point.198"]: Bone;
					};
				};
				f: Model & {
					Path: MeshPart & {
						["Point.089"]: Bone;
						["Point.158"]: Bone;
						["Point.025"]: Bone;
						["Point.124"]: Bone;
						["Point.258"]: Bone;
						["Point.154"]: Bone;
						["Point.194"]: Bone;
						["Point.058"]: Bone;
						["Point.211"]: Bone;
						["Point.236"]: Bone;
						["Point.021"]: Bone;
						["Point.243"]: Bone;
						["Point.062"]: Bone;
						["Point.008"]: Bone;
						["Point.264"]: Bone;
						["Point.052"]: Bone;
						["Point.123"]: Bone;
						["Point.099"]: Bone;
						["Point.119"]: Bone;
						["Point.260"]: Bone;
						["Point.137"]: Bone;
						["Point.172"]: Bone;
						["Point.173"]: Bone;
						["Point.148"]: Bone;
						["Point.220"]: Bone;
						["Point.098"]: Bone;
						["Point.164"]: Bone;
						["Point.208"]: Bone;
						["Point.094"]: Bone;
						["Point.077"]: Bone;
						["Point.149"]: Bone;
						["Point.122"]: Bone;
						["Point.202"]: Bone;
						["Point.036"]: Bone;
						["Point.076"]: Bone;
						["Point.199"]: Bone;
						["Point.132"]: Bone;
						["Point.187"]: Bone;
						["Point.101"]: Bone;
						["Point.102"]: Bone;
						["Point.256"]: Bone;
						["Point.232"]: Bone;
						["Point.090"]: Bone;
						["Point.186"]: Bone;
						["Point.050"]: Bone;
						["Point.133"]: Bone;
						["Point.189"]: Bone;
						["Point.228"]: Bone;
						["Point.039"]: Bone;
						["Point.143"]: Bone;
						["Point.234"]: Bone;
						["Point.152"]: Bone;
						["Point.155"]: Bone;
						["Point.288"]: Bone;
						["Point.218"]: Bone;
						["Point.082"]: Bone;
						["Point.193"]: Bone;
						["Point.163"]: Bone;
						["Point.245"]: Bone;
						["Point.286"]: Bone;
						["Point.146"]: Bone;
						["Point.125"]: Bone;
						["Point.179"]: Bone;
						["Point.136"]: Bone;
						["Point.237"]: Bone;
						["Point.222"]: Bone;
						["Point.015"]: Bone;
						["Point.035"]: Bone;
						["Point.053"]: Bone;
						["Point.134"]: Bone;
						["Point.262"]: Bone;
						["Point.276"]: Bone;
						["Point.011"]: Bone;
						["Point.126"]: Bone;
						["Point.023"]: Bone;
						["Point.140"]: Bone;
						["Point.167"]: Bone;
						["Point.190"]: Bone;
						["Point.079"]: Bone;
						["Point.274"]: Bone;
						["Point.117"]: Bone;
						["Point.080"]: Bone;
						["Point.201"]: Bone;
						["Point.068"]: Bone;
						["Point.083"]: Bone;
						["Point.221"]: Bone;
						["Point.225"]: Bone;
						["Point.057"]: Bone;
						["Point.192"]: Bone;
						["Point.196"]: Bone;
						["Point.275"]: Bone;
						["Point.054"]: Bone;
						["Point.178"]: Bone;
						["Point.045"]: Bone;
						["Point.072"]: Bone;
						["Point.271"]: Bone;
						["Point.184"]: Bone;
						["Point.161"]: Bone;
						["Point.151"]: Bone;
						["Point.153"]: Bone;
						["Point.084"]: Bone;
						["Point.020"]: Bone;
						["Point.278"]: Bone;
						["Point.227"]: Bone;
						["Point.279"]: Bone;
						["Point.282"]: Bone;
						["Point.027"]: Bone;
						["Point.180"]: Bone;
						["Point.272"]: Bone;
						["Point.289"]: Bone;
						["Point.032"]: Bone;
						["Point.169"]: Bone;
						["Point.238"]: Bone;
						["Point.043"]: Bone;
						["Point.128"]: Bone;
						["Point.105"]: Bone;
						["Point.114"]: Bone;
						["Point.069"]: Bone;
						["Point.121"]: Bone;
						["Point.070"]: Bone;
						["Point.135"]: Bone;
						["Point.095"]: Bone;
						["Point.006"]: Bone;
						["Point.171"]: Bone;
						["Point.013"]: Bone;
						["Point.092"]: Bone;
						["Point.118"]: Bone;
						["Point.241"]: Bone;
						["Point.129"]: Bone;
						["Point.074"]: Bone;
						["Point.273"]: Bone;
						["Point.086"]: Bone;
						["Point.165"]: Bone;
						["Point.144"]: Bone;
						["Point.109"]: Bone;
						["Point.283"]: Bone;
						["Point.088"]: Bone;
						["Point.138"]: Bone;
						["Point.183"]: Bone;
						["Point.014"]: Bone;
						["Point.255"]: Bone;
						["Point.159"]: Bone;
						["Point.263"]: Bone;
						["Point.067"]: Bone;
						["Point.104"]: Bone;
						["Point.016"]: Bone;
						["Point.034"]: Bone;
						["Point.213"]: Bone;
						["Point.012"]: Bone;
						["Point.259"]: Bone;
						["Point.073"]: Bone;
						["Point.209"]: Bone;
						["Point.056"]: Bone;
						["Point.203"]: Bone;
						["Point.230"]: Bone;
						["Point.226"]: Bone;
						["Point.253"]: Bone;
						["Point.037"]: Bone;
						["Point.093"]: Bone;
						["Point.096"]: Bone;
						["Point.188"]: Bone;
						["Point.131"]: Bone;
						["Point.174"]: Bone;
						["Point.051"]: Bone;
						["Point.277"]: Bone;
						["Point.280"]: Bone;
						["Point.170"]: Bone;
						["Point.001"]: Bone;
						["Point.002"]: Bone;
						["Point.139"]: Bone;
						["Point.214"]: Bone;
						["Point.003"]: Bone;
						["Point.004"]: Bone;
						["Point.005"]: Bone;
						["Point.142"]: Bone;
						["Point.007"]: Bone;
						["Point.009"]: Bone;
						["Point.240"]: Bone;
						["Point.175"]: Bone;
						["Point.018"]: Bone;
						["Point.019"]: Bone;
						["Point.055"]: Bone;
						["Point.150"]: Bone;
						["Point.160"]: Bone;
						["Point.115"]: Bone;
						["Point.026"]: Bone;
						["Point.219"]: Bone;
						["Point.010"]: Bone;
						["Point.204"]: Bone;
						["Point.110"]: Bone;
						["Point.029"]: Bone;
						["Point.030"]: Bone;
						["Point.233"]: Bone;
						["Point.031"]: Bone;
						["Point.033"]: Bone;
						["Point.081"]: Bone;
						["Point.120"]: Bone;
						["Point.212"]: Bone;
						["Point.106"]: Bone;
						["Point.066"]: Bone;
						["Point.038"]: Bone;
						["Point.257"]: Bone;
						["Point.040"]: Bone;
						["Point.049"]: Bone;
						["Point.216"]: Bone;
						["Point.041"]: Bone;
						["Point.042"]: Bone;
						["Point.210"]: Bone;
						["Point.248"]: Bone;
						["Point.207"]: Bone;
						["Point.252"]: Bone;
						["Point.145"]: Bone;
						["Point.166"]: Bone;
						["Point.046"]: Bone;
						["Point.028"]: Bone;
						["Point.285"]: Bone;
						["Point.116"]: Bone;
						["Point.287"]: Bone;
						["Point.223"]: Bone;
						["Point.242"]: Bone;
						["Point.047"]: Bone;
						["Point.235"]: Bone;
						["Point.157"]: Bone;
						["Point.048"]: Bone;
						["Point.197"]: Bone;
						["Point.246"]: Bone;
						["Point.284"]: Bone;
						["Point.239"]: Bone;
						["Point.231"]: Bone;
						["Point.265"]: Bone;
						["Point.168"]: Bone;
						["Point.022"]: Bone;
						["Point.017"]: Bone;
						["Point.281"]: Bone;
						["Point.059"]: Bone;
						["Point.191"]: Bone;
						["Point.060"]: Bone;
						["Point.244"]: Bone;
						["Point.061"]: Bone;
						["Point.063"]: Bone;
						["Point.064"]: Bone;
						["Point.268"]: Bone;
						["Point.181"]: Bone;
						["Point.147"]: Bone;
						["Point.065"]: Bone;
						["Point.085"]: Bone;
						["Point.176"]: Bone;
						["Point.071"]: Bone;
						["Point.141"]: Bone;
						["Point.251"]: Bone;
						["Point.215"]: Bone;
						["Point.075"]: Bone;
						["Point.254"]: Bone;
						["Point.078"]: Bone;
						["Point.200"]: Bone;
						["Point.195"]: Bone;
						["Point.044"]: Bone;
						["Point.270"]: Bone;
						["Point.177"]: Bone;
						["Point.087"]: Bone;
						["Point.091"]: Bone;
						["Point.097"]: Bone;
						["Point.269"]: Bone;
						["Point.247"]: Bone;
						["Point.100"]: Bone;
						["Point.103"]: Bone;
						["Point.185"]: Bone;
						["Point.107"]: Bone;
						["Point.108"]: Bone;
						["Point.229"]: Bone;
						["Point.111"]: Bone;
						["Point.249"]: Bone;
						["Point.112"]: Bone;
						["Point.250"]: Bone;
						["Point.266"]: Bone;
						["Point.113"]: Bone;
						["Point.024"]: Bone;
						["Point.127"]: Bone;
						["Point.130"]: Bone;
						["Point.182"]: Bone;
						["Point.224"]: Bone;
						["Point.217"]: Bone;
						["Point.261"]: Bone;
						["Point.205"]: Bone;
						["Point.156"]: Bone;
						["Point.162"]: Bone;
						["Point.267"]: Bone;
						["Point.206"]: Bone;
						["Point.198"]: Bone;
					};
				};
			};
			Walls: Folder & {
				["Wooden Wall"]: Model;
			};
		};
		Underground: Folder & {
			Core: Folder & {
				Start: Model & {
					BasePart: Part;
				};
			};
			Paths: Folder & {
				Turn1: Model & {
					BasePart: Part & {
						Attachment: Attachment;
					};
				};
				Intersection: Model & {
					BasePart: Part & {
						Attachment: Attachment;
					};
				};
				Turn2: Model & {
					BasePart: Part & {
						Attachment: Attachment;
					};
				};
				Straight: Model & {
					BasePart: Part & {
						Attachment: Attachment;
					};
				};
			};
		};
	};
	TerrainGeneratorData: Folder;
	CoolSounds: Model & {
		["Strong Blizzard Snowstorm Wind Loop"]: Sound;
		["White Space 60"]: Sound;
		Vlood: Part & {
			Attachment: Attachment & {
				ParticleEmitter: ParticleEmitter;
			};
		};
		["Future City"]: Sound;
		["Gods Wind Spooky Eerie 2 (SFX)"]: Sound;
		["White Space (Novus Eden, Mvt. 2)"]: Sound;
	};
	RBX_ANIMSAVES: Model & {
		Crow: ObjectValue & {
			["Imported Animation Clip"]: KeyframeSequence;
		};
	};
	DroppedItems: Folder & {
		Meat: Model & {
			["Meat "]: MeshPart & {
				PickUp: ProximityPrompt;
			};
		};
		["Wooden Log"]: Model & {
			WoodenLog: Part & {
				PickUp: ProximityPrompt;
			};
		};
	};
}
