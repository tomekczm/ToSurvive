interface StarterGui extends BasePlayerGui {
	SafeGui: ScreenGui & {
		Text: TextLabel;
	};
	BuildGui: ScreenGui & {
		Background: Frame & {
			UIGridLayout: UIGridLayout;
			UIPadding: UIPadding;
			Slot: ImageLabel & {
				UICorner: UICorner;
				UIGridLayout: UIGridLayout;
				UIGradient: UIGradient;
				UIStroke: UIStroke;
			};
			UICorner: UICorner;
			UIStroke: UIStroke;
			UIGradient: UIGradient;
		};
	};
	DraggingGui: ScreenGui & {
		ImageLabel: ImageLabel;
	};
	DayNotificator: ScreenGui & {
		Text: TextLabel;
	};
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
			ViewportFrame: ViewportFrame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				UIGradient: UIGradient;
			};
			InventoryBackground: Frame & {
				UICorner: UICorner;
				UIStroke: UIStroke;
				UIGradient: UIGradient;
				Frame: Frame & {
					UIGridLayout: UIGridLayout;
				};
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
