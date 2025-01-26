interface SoundService extends Instance {
	SoundGroup: SoundGroup & {
		StruckGold: Sound;
		Dig: Sound;
		WoodChestHit: Sound;
		OreDig: Sound;
	};
	Wind: Sound;
	Damaged: SoundGroup & {
		heartbeat: Sound;
		["Sword Hit (Impact)"]: Sound;
		["Ringing (Death)"]: Sound;
	};
	["Long Beep - Heart rate Monitor"]: Sound;
}
