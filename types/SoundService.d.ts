interface SoundService extends Instance {
	Damaged: SoundGroup & {
		heartbeat: Sound;
		["Sword Hit (Impact)"]: Sound;
		["Ringing (Death)"]: Sound;
	};
	Wind: Sound;
}
