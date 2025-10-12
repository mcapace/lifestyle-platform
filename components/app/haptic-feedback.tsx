"use client";

// Haptic feedback simulation for web (visual feedback)
export const triggerHaptic = (type: "light" | "medium" | "heavy" = "light") => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    };
    navigator.vibrate(patterns[type]);
  }
};

// Visual feedback component
export function useHapticFeedback() {
  const lightTap = () => triggerHaptic("light");
  const mediumTap = () => triggerHaptic("medium");
  const heavyTap = () => triggerHaptic("heavy");

  return { lightTap, mediumTap, heavyTap };
}

