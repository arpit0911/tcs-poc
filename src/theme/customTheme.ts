import {
  createLightTheme,
  createDarkTheme,
  type Theme,
  type BrandVariants,
} from "@fluentui/react-components";

// Generated 16-step ramp centered on Light Primary (#8B9A6E)
const lightBrandRamp: BrandVariants = {
  10: "#060705",
  20: "#13160f",
  30: "#1c2215",
  40: "#252d1b",
  50: "#2e3922",
  60: "#384628",
  70: "#43532f",
  80: "#4e6037",
  90: "#5a6d3f",
  100: "#667a47",
  110: "#738850",
  120: "#809659",
  130: "#8B9A6E",
  140: "#9eb474",
  150: "#adc581",
  160: "#bdd68f",
};

// Generated 16-step ramp centered on Dark Primary (#B8892D)
const darkBrandRamp: BrandVariants = {
  10: "#030201",
  20: "#141006",
  30: "#211909",
  40: "#2e230d",
  50: "#3b2d10",
  60: "#493814",
  70: "#574318",
  80: "#664f1c",
  90: "#755b21",
  100: "#856725",
  110: "#95742a",
  120: "#a68230",
  130: "#B8892D",
  140: "#c79636",
  150: "#d4a441",
  160: "#dfb24e",
};

export const customLightTheme: Theme = {
  ...createLightTheme(lightBrandRamp),
  // Override tokens with specific client light palette
  colorNeutralBackground1: "#F7F2EB", // Base App Background
  colorNeutralBackground2: "#EAE2D6", // Cards & Form Surfaces
  colorNeutralStroke1: "#EEEEEE", // Borders & Dividers
  fontFamilyBase: "'Poppins', sans-serif",
};

export const customDarkTheme: Theme = {
  ...createDarkTheme(darkBrandRamp), // Keeps Gold (#B8892D) for primary buttons

  // FIX: Use a very dark, near-black neutral for the main app background
  colorNeutralBackground1: "#12140e",

  // FIX: Use the client's Dark Olive for the elevated cards/forms to give them pop
  colorNeutralBackground2: "#4F5B2A",

  // Text & Borders stay exactly as the client requested
  colorNeutralForeground1: "#F5EFE3", // Main Text (Cream)
  colorNeutralForeground2: "#D8C9A8", // Secondary Text (Khaki)
  colorNeutralStroke1: "#B8892D", // Changed borders to Gold for better visibility against the olive

  fontFamilyBase: "'Poppins', sans-serif",
};
