interface SoundService extends Instance {
	SoundGroup: SoundGroup & {
		WoodChestHit: Sound;
		OreDig: Sound;
		Dig: Sound;
		Grab: Sound;
		StruckGold: Sound;
	};
	Wind: Sound;
	Damaged: SoundGroup & {
		heartbeat: Sound;
		["Sword Hit (Impact)"]: Sound;
		["Ringing (Death)"]: Sound;
	};
	["Long Beep - Heart rate Monitor"]: Sound;
}
