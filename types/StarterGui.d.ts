interface StarterGui extends BasePlayerGui {
	SafeGui: ScreenGui & {
		Text: TextLabel;
	};
	DayNotificator: ScreenGui & {
		Text: TextLabel;
	};
	Inventory: ScreenGui & {
		UIListLayout: UIListLayout;
	};
}
