import type { ClerkAppearanceTheme } from "@clerk/shared/types";

export const clerkAppearance: ClerkAppearanceTheme = {
  variables: {
    colorPrimary: "#5b3a1f",
    colorBackground: "#efeae0",
    colorText: "#2a2520",
    colorTextSecondary: "#6b6056",
    colorInputBackground: "#f6f1e7",
    colorInputText: "#2a2520",
    colorDanger: "#8a3c2c",
    colorSuccess: "#3c5a3a",
    colorNeutral: "#2a2520",
    borderRadius: "2px",
    fontFamily: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace",
    fontSize: "14px",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-[var(--color-paper-soft,#efeae0)] border border-[var(--color-line,#d8d0c1)] shadow-none rounded-[2px]",
    headerTitle: "lowercase tracking-tight text-[var(--color-ink,#2a2520)]",
    headerSubtitle: "lowercase text-[var(--color-muted,#6b6056)]",
    socialButtonsBlockButton:
      "lowercase border border-[var(--color-line,#d8d0c1)] hover:bg-[var(--color-paper,#f6f1e7)] rounded-[2px]",
    socialButtonsBlockButtonText: "lowercase",
    dividerLine: "bg-[var(--color-line,#d8d0c1)]",
    dividerText: "lowercase text-[var(--color-muted,#6b6056)] tracking-[0.16em] text-[10px]",
    formFieldLabel: "lowercase tracking-[0.06em] text-[var(--color-muted,#6b6056)]",
    formFieldInput:
      "border border-[var(--color-line,#d8d0c1)] bg-[var(--color-paper,#f6f1e7)] rounded-[2px] focus:border-[var(--color-seal,#5b3a1f)]",
    formButtonPrimary:
      "lowercase bg-[var(--color-seal,#5b3a1f)] hover:bg-[var(--color-ink,#2a2520)] rounded-[2px] tracking-[0.06em] text-[13px] normal-case",
    footerActionLink: "lowercase text-[var(--color-seal,#5b3a1f)] hover:text-[var(--color-ink,#2a2520)]",
    footerActionText: "lowercase text-[var(--color-muted,#6b6056)]",
    identityPreviewText: "lowercase",
    identityPreviewEditButton: "lowercase",
    formResendCodeLink: "lowercase",
    otpCodeFieldInput: "border border-[var(--color-line,#d8d0c1)] rounded-[2px]",
    userButtonAvatarBox: "rounded-[2px] h-7 w-7",
    userButtonPopoverCard:
      "bg-[var(--color-paper-soft,#efeae0)] border border-[var(--color-line,#d8d0c1)] rounded-[2px] shadow-sm",
    userButtonPopoverActionButton: "lowercase",
    userPreviewMainIdentifier: "lowercase",
    userPreviewSecondaryIdentifier: "lowercase",
  },
  layout: {
    socialButtonsPlacement: "top",
    socialButtonsVariant: "blockButton",
    showOptionalFields: false,
    logoPlacement: "none",
  },
};
