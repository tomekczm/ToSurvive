interface StarterGui extends BasePlayerGui {
	SafeGui: ScreenGui & {
		Text: TextLabel;
	};
	BuildGui: ScreenGui & {
		Background: TextButton & {
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIPadding: UIPadding;
			UIGridLayout: UIGridLayout;
		};
	};
	DraggingGui: ScreenGui & {
		ImageLabel: ImageLabel;
	};
	DayNotificator: ScreenGui & {
		SeasonNotif: ImageLabel;
		Text: TextLabel;
	};
	ItemsAdded: ScreenGui & {
		Frame: Frame & {
			UIListLayout: UIListLayout;
			background: Frame & {
				Title: TextLabel;
				UIGradient: UIGradient;
				UIListLayout: UIListLayout;
				UIStroke: UIStroke;
				UIPadding: UIPadding;
				UICorner: UICorner;
			};
		};
	};
	Healthbar: ScreenGui & {
		Frame: Frame & {
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
		};
	};
	KeyHints: ScreenGui & {
		Frame: Frame & {
			UIListLayout: UIListLayout;
		};
	};
	Temp: ScreenGui;
	Tree: ScreenGui & {
		Background: Frame & {
			Holder: Frame;
		};
		Gradient: CanvasGroup & {
			UIGradient: UIGradient;
		};
	};
	Crafting: ScreenGui & {
		Background: Frame & {
			UIGridLayout: UIGridLayout;
			UIPadding: UIPadding;
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
		};
	};
	Inventory: ScreenGui & {
		Hotbar: Frame & {
			UIListLayout: UIListLayout;
		};
		Background: Frame & {
			InventoryBackground: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				UIGradient: UIGradient;
				Frame: Frame & {
					UIGridLayout: UIGridLayout;
				};
			};
			TextLabel: TextButton;
			ViewportFrame: ViewportFrame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				UIGradient: UIGradient;
				WorldModel: WorldModel;
			};
		};
	};
	Mouse: ScreenGui & {
		Pointer: Frame & {
			UICorner: UICorner;
			UIStroke: UIStroke;
		};
	};
	RecipeDrag: ScreenGui & {
		background: Frame & {
			UIPadding: UIPadding;
			Description: TextLabel;
			UIListLayout: UIListLayout;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
			UICorner: UICorner;
		};
	};
	Hover: ScreenGui & {
		background: Frame & {
			UIGradient: UIGradient;
			Description: TextLabel;
			UIPadding: UIPadding;
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIListLayout: UIListLayout;
			Title: TextLabel & {
				UIGradient: UIGradient;
			};
		};
	};
}
