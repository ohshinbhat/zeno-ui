export type ThemeTrend =
  | "glassmorphism"
  | "bento"
  | "minimal"
  | "brutalist"
  | "editorial"
  | "clay";

export type ThemeWeather =
  | "clear"
  | "rain"
  | "snow"
  | "fog"
  | "storm"
  | "golden-hour"
  | "night";

export type ThemeDensity = "compact" | "cozy" | "spacious";
export type ThemeType = "calm" | "editorial" | "technical" | "playful";
export type ThemeElevation = "flat" | "layered" | "floating" | "glass";
export type ThemeBorder = "none" | "subtle" | "crisp" | "expressive";
export type ThemeMotion = "none" | "minimal" | "smooth" | "playful" | "energetic";
export type ThemeTexture = "clean" | "glass" | "grain" | "glow" | "bento";
export type ThemeContrast = "normal" | "high" | "AAA";
export type ThemeMode = "light" | "dark" | "adaptive";
export type ThemeMood =
  | "clear"
  | "rainy"
  | "foggy"
  | "neon"
  | "warm"
  | "cold"
  | "luxury"
  | "brutal";

export type ThemeKnobs = {
  brand: string;
  accent: string;
  trend: ThemeTrend;
  weather: ThemeWeather;
  density: ThemeDensity;
  type: ThemeType;
  elevation: ThemeElevation;
  border: ThemeBorder;
  motion: ThemeMotion;
  texture: ThemeTexture;
  contrast: ThemeContrast;
  mode: ThemeMode;
  mood: ThemeMood;
};

export type ColorTokens = {
  background: string;
  surface: string;
  surfaceRaised: string;
  surfaceGlass: string;
  text: string;
  textMuted: string;
  border: string;
  brand: string;
  brandContrast: string;
  accent: string;
  accentContrast: string;
  success: string;
  warning: string;
  danger: string;
};

export type RadiusTokens = {
  control: string;
  card: string;
  pill: string;
};

export type SpacingTokens = {
  card: string;
  section: string;
  gap2: string;
  gap3: string;
  gap4: string;
  gap5: string;
};

export type TypeTokens = {
  sans: string;
  display: string;
  mono: string;
  label: string;
  body: string;
  title: string;
  displaySize: string;
  labelLine: string;
  bodyLine: string;
  titleLine: string;
  displayLine: string;
};

export type SizeTokens = {
  control2: string;
  control3: string;
  control4: string;
  control5: string;
  icon2: string;
  icon3: string;
  icon4: string;
  icon5: string;
  paddingX2: string;
  paddingX3: string;
  paddingX4: string;
  paddingX5: string;
  paddingY2: string;
  paddingY3: string;
  paddingY4: string;
  paddingY5: string;
};

export type ShadowTokens = {
  elevated: string;
  floating: string;
  focus: string;
  glow: string;
};

export type MotionTokens = {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easeStandard: string;
  easeEnter: string;
  easeExit: string;
  scaleEnter: string;
  scalePress: string;
  opacityEnter: string;
  opacityDisabled: string;
  stagger: string;
};

export type DesignTokens = {
  name: string;
  id: string;
  seed: string;
  knobs: ThemeKnobs;
  color: ColorTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  type: TypeTokens;
  size: SizeTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
  blur: {
    glass: string;
  };
  opacity: {
    glass: string;
    disabled: string;
  };
};

export type ValidationResult = {
  valid: boolean;
  issues: string[];
  score: {
    contrast: number;
    consistency: number;
    accessibility: number;
  };
};

export const zenoTokenConfigSchemaVersion = "1.0.0" as const;

export type ZenoAssetToken = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  hash?: string;
};

export type ZenoTokenConfigMetadata = {
  name: string;
  projectId?: string;
  environment?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ZenoTokenConfig = {
  schemaVersion: typeof zenoTokenConfigSchemaVersion;
  metadata: ZenoTokenConfigMetadata;
  tokens: DesignTokens;
  assets: Record<string, ZenoAssetToken>;
  modes: Record<string, Partial<DesignTokens>>;
  publishedVersion?: string;
  validation: ValidationResult;
};

export type ZenoTokenConfigInput = {
  schemaVersion?: string;
  metadata?: Partial<ZenoTokenConfigMetadata>;
  tokens?: Partial<DesignTokens>;
  assets?: Record<string, Partial<ZenoAssetToken> | undefined>;
  modes?: Record<string, Partial<DesignTokens> | undefined>;
  publishedVersion?: string;
};

export type ZenoTokenConfigReadResult = {
  valid: boolean;
  config: ZenoTokenConfig;
  issues: string[];
};

export const allowedAssetTokenKeys = [
  "logo",
  "logoDark",
  "favicon",
  "appIcon",
  "emptyState",
  "heroImage"
] as const;

export const defaultKnobs: ThemeKnobs = {
  brand: "#2563eb",
  accent: "#14b8a6",
  trend: "minimal",
  weather: "clear",
  density: "cozy",
  type: "technical",
  elevation: "layered",
  border: "subtle",
  motion: "smooth",
  texture: "clean",
  contrast: "normal",
  mode: "light",
  mood: "clear"
};

export const baseTokens: DesignTokens = {
  name: "Clear Minimal",
  id: "clear-minimal",
  seed: "base",
  knobs: defaultKnobs,
  color: {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceRaised: "#f1f5f9",
    surfaceGlass: "rgb(255 255 255 / 0.72)",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#cbd5e1",
    brand: "#2563eb",
    brandContrast: "#ffffff",
    accent: "#14b8a6",
    accentContrast: "#042f2e",
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626"
  },
  radius: {
    control: "0.75rem",
    card: "1rem",
    pill: "999px"
  },
  spacing: {
    card: "1rem",
    section: "2rem",
    gap2: "0.375rem",
    gap3: "0.5rem",
    gap4: "0.75rem",
    gap5: "1rem"
  },
  type: {
    sans: "\"Instrument Sans\", Inter, ui-sans-serif, system-ui, sans-serif",
    display: "\"Instrument Sans\", Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace",
    label: "0.8125rem",
    body: "0.9375rem",
    title: "1.5rem",
    displaySize: "3rem",
    labelLine: "1rem",
    bodyLine: "1.5rem",
    titleLine: "1.875rem",
    displayLine: "3.25rem"
  },
  size: {
    control2: "2rem",
    control3: "2.5rem",
    control4: "3rem",
    control5: "3.5rem",
    icon2: "0.875rem",
    icon3: "1rem",
    icon4: "1.125rem",
    icon5: "1.25rem",
    paddingX2: "0.75rem",
    paddingX3: "1rem",
    paddingX4: "1.25rem",
    paddingX5: "1.5rem",
    paddingY2: "0.375rem",
    paddingY3: "0.625rem",
    paddingY4: "0.75rem",
    paddingY5: "0.875rem"
  },
  shadow: {
    elevated: "0 12px 32px rgb(15 23 42 / 0.10)",
    floating: "0 20px 60px rgb(15 23 42 / 0.18)",
    focus: "0 0 0 3px rgb(37 99 235 / 0.28)",
    glow: "0 0 34px rgb(20 184 166 / 0.26)"
  },
  motion: {
    durationFast: "120ms",
    durationNormal: "220ms",
    durationSlow: "420ms",
    easeStandard: "cubic-bezier(.2,0,0,1)",
    easeEnter: "cubic-bezier(.16,1,.3,1)",
    easeExit: "cubic-bezier(.7,0,.84,0)",
    scaleEnter: ".98",
    scalePress: ".97",
    opacityEnter: "0",
    opacityDisabled: ".55",
    stagger: "40ms"
  },
  blur: {
    glass: "18px"
  },
  opacity: {
    glass: ".76",
    disabled: ".55"
  }
};

export const themePresets: Record<string, Partial<ThemeKnobs> & { name: string; prompt: string }> = {
  "rainy-glass": {
    name: "Rainy Glass",
    prompt: "rainy glassmorphism fintech dashboard",
    brand: "#38bdf8",
    accent: "#22d3ee",
    trend: "glassmorphism",
    weather: "rain",
    mood: "rainy",
    texture: "glass",
    elevation: "glass",
    motion: "smooth",
    mode: "dark"
  },
  "bento-saas": {
    name: "Bento SaaS",
    prompt: "bento saas dashboard compact",
    brand: "#4f46e5",
    accent: "#06b6d4",
    trend: "bento",
    texture: "bento",
    density: "compact",
    type: "technical"
  },
  "luxury-commerce": {
    name: "Luxury Commerce",
    prompt: "luxury ecommerce editorial warm",
    brand: "#7c3aed",
    accent: "#c8a96a",
    trend: "editorial",
    mood: "luxury",
    weather: "golden-hour",
    type: "editorial",
    motion: "minimal"
  },
  "neon-gaming": {
    name: "Neon Gaming",
    prompt: "gaming neon energetic dark",
    brand: "#a855f7",
    accent: "#22c55e",
    trend: "brutalist",
    mood: "neon",
    texture: "glow",
    motion: "energetic",
    mode: "dark"
  },
  "immersive-webgl": {
    name: "Immersive WebGL",
    prompt: "immersive webgl 3d portfolio dark energetic",
    brand: "#7c3aed",
    accent: "#22d3ee",
    trend: "brutalist",
    mood: "neon",
    texture: "glow",
    elevation: "floating",
    density: "spacious",
    type: "playful",
    motion: "energetic",
    mode: "dark"
  },
  "editorial-story": {
    name: "Editorial Story",
    prompt: "editorial storytelling magazine warm spacious",
    brand: "#9f1239",
    accent: "#f59e0b",
    trend: "editorial",
    mood: "warm",
    weather: "golden-hour",
    density: "spacious",
    type: "editorial",
    motion: "smooth"
  },
  "civic-minimal": {
    name: "Civic Minimal",
    prompt: "accessible government open design system high contrast clean",
    brand: "#1d4ed8",
    accent: "#047857",
    trend: "minimal",
    mood: "clear",
    density: "cozy",
    type: "technical",
    border: "crisp",
    motion: "minimal",
    texture: "clean",
    contrast: "AAA"
  },
  "ai-studio": {
    name: "AI Studio",
    prompt: "ai product workspace dark glow technical dashboard",
    brand: "#4f46e5",
    accent: "#a3e635",
    trend: "bento",
    mood: "neon",
    texture: "glow",
    density: "compact",
    type: "technical",
    motion: "smooth",
    mode: "dark"
  },
  "health-calm": {
    name: "Health Calm",
    prompt: "healthcare dashboard calm soft spacious",
    brand: "#0f766e",
    accent: "#65a30d",
    trend: "clay",
    mood: "clear",
    density: "spacious",
    type: "calm",
    elevation: "floating",
    motion: "minimal",
    texture: "clean"
  },
  "retro-pixel": {
    name: "Retro Pixel",
    prompt: "retro pixel playful brutal high contrast app",
    brand: "#b91c1c",
    accent: "#facc15",
    trend: "brutalist",
    mood: "brutal",
    density: "compact",
    type: "playful",
    border: "expressive",
    motion: "playful",
    contrast: "high"
  },
  "kinetic-commerce": {
    name: "Kinetic Commerce",
    prompt: "ecommerce colorful motion product grid warm",
    brand: "#be185d",
    accent: "#ea580c",
    trend: "bento",
    mood: "warm",
    weather: "golden-hour",
    texture: "bento",
    density: "cozy",
    type: "editorial",
    motion: "playful"
  },
  "quiet-enterprise": {
    name: "Quiet Enterprise",
    prompt: "enterprise analytics clean dense accessible",
    brand: "#475569",
    accent: "#0284c7",
    trend: "minimal",
    mood: "clear",
    density: "compact",
    type: "technical",
    border: "crisp",
    motion: "minimal",
    contrast: "high"
  },
  "architecture-mono": {
    name: "Architecture Mono",
    prompt: "architecture portfolio minimal editorial monochrome spacious",
    brand: "#18181b",
    accent: "#71717a",
    trend: "editorial",
    mood: "clear",
    density: "spacious",
    type: "editorial",
    border: "crisp",
    motion: "smooth"
  },
  "crypto-glow": {
    name: "Crypto Glow",
    prompt: "cryptocurrency dashboard dark glowing bento",
    brand: "#6d28d9",
    accent: "#f59e0b",
    trend: "bento",
    mood: "neon",
    texture: "glow",
    density: "compact",
    type: "technical",
    motion: "energetic",
    mode: "dark"
  },
  "social-signal": {
    name: "Social Signal",
    prompt: "social blue timeline minimal compact",
    brand: "#0369a1",
    accent: "#2563eb",
    trend: "minimal",
    mood: "clear",
    density: "compact",
    type: "technical",
    border: "crisp",
    motion: "smooth"
  },
  "violet-fog": {
    name: "Violet Fog",
    prompt: "violet haze foggy glass product dashboard",
    brand: "#7e22ce",
    accent: "#c084fc",
    trend: "glassmorphism",
    weather: "fog",
    mood: "foggy",
    texture: "glass",
    elevation: "glass",
    motion: "smooth",
    mode: "dark"
  },
  "pastel-terminal": {
    name: "Pastel Terminal",
    prompt: "pastel terminal dark developer workspace",
    brand: "#cba6f7",
    accent: "#94e2d5",
    trend: "minimal",
    weather: "night",
    mood: "cold",
    density: "compact",
    type: "technical",
    motion: "minimal",
    mode: "dark"
  },
  "moss-lantern": {
    name: "Moss Lantern",
    prompt: "forest grove calm green product dashboard",
    brand: "#166534",
    accent: "#84cc16",
    trend: "clay",
    mood: "clear",
    density: "cozy",
    type: "calm",
    elevation: "floating",
    motion: "minimal"
  },
  "rose-orbit": {
    name: "Rose Orbit",
    prompt: "rose quantum neon product analytics",
    brand: "#be185d",
    accent: "#22d3ee",
    trend: "bento",
    mood: "neon",
    texture: "glow",
    density: "compact",
    type: "technical",
    motion: "energetic",
    mode: "dark"
  },
  "gilded-editorial": {
    name: "Gilded Editorial",
    prompt: "luxury gold editorial commerce atelier",
    brand: "#78350f",
    accent: "#d97706",
    trend: "editorial",
    weather: "golden-hour",
    mood: "luxury",
    density: "spacious",
    type: "editorial",
    motion: "minimal",
    texture: "grain"
  },
  "concrete-pop": {
    name: "Concrete Pop",
    prompt: "brutalist pop high contrast portfolio",
    brand: "#111827",
    accent: "#ef4444",
    trend: "brutalist",
    mood: "brutal",
    density: "compact",
    type: "playful",
    border: "expressive",
    motion: "playful",
    contrast: "high"
  },
  "espresso-console": {
    name: "Espresso Console",
    prompt: "coffee dark developer console warm",
    brand: "#92400e",
    accent: "#f97316",
    trend: "minimal",
    weather: "night",
    mood: "warm",
    density: "compact",
    type: "technical",
    texture: "grain",
    motion: "minimal",
    mode: "dark"
  },
  "nocturne-flora": {
    name: "Nocturne Flora",
    prompt: "midnight floral dark editorial dashboard",
    brand: "#86198f",
    accent: "#ec4899",
    trend: "editorial",
    weather: "night",
    mood: "neon",
    texture: "glow",
    density: "cozy",
    type: "editorial",
    motion: "smooth",
    mode: "dark"
  },
  "archive-ink": {
    name: "Archive Ink",
    prompt: "vintage paper archive editorial warm",
    brand: "#78350f",
    accent: "#b45309",
    trend: "editorial",
    weather: "golden-hour",
    mood: "warm",
    density: "spacious",
    type: "editorial",
    texture: "grain",
    motion: "minimal"
  },
  "artifact-warmth": {
    name: "Artifact Warmth",
    prompt: "warm ai assistant workspace calm",
    brand: "#c2410c",
    accent: "#0f766e",
    trend: "bento",
    mood: "warm",
    density: "cozy",
    type: "technical",
    texture: "bento",
    motion: "smooth"
  },
  "launch-mono": {
    name: "Launch Mono",
    prompt: "monochrome startup launch minimal high contrast",
    brand: "#111827",
    accent: "#4b5563",
    trend: "minimal",
    mood: "clear",
    density: "compact",
    type: "technical",
    border: "crisp",
    motion: "minimal",
    contrast: "high"
  },
  "workbench-blue": {
    name: "Workbench Blue",
    prompt: "developer ide blue dark technical",
    brand: "#2563eb",
    accent: "#22d3ee",
    trend: "minimal",
    weather: "night",
    mood: "cold",
    density: "compact",
    type: "technical",
    motion: "minimal",
    mode: "dark"
  },
  "polar-circuit": {
    name: "Polar Circuit",
    prompt: "nord frost data dashboard cold",
    brand: "#4c6f92",
    accent: "#88c0d0",
    trend: "bento",
    weather: "snow",
    mood: "cold",
    density: "compact",
    type: "technical",
    texture: "bento",
    motion: "smooth",
    mode: "dark"
  },
  "lemonade-lab": {
    name: "Lemonade Lab",
    prompt: "lemon yellow playful light app",
    brand: "#ca8a04",
    accent: "#84cc16",
    trend: "clay",
    mood: "warm",
    density: "cozy",
    type: "playful",
    elevation: "floating",
    motion: "playful"
  },
  "silk-system": {
    name: "Silk System",
    prompt: "silk soft minimal product workspace",
    brand: "#334155",
    accent: "#db2777",
    trend: "minimal",
    mood: "clear",
    density: "cozy",
    type: "technical",
    elevation: "floating",
    motion: "smooth"
  },
  "abyss-signal": {
    name: "Abyss Signal",
    prompt: "abyss dark high contrast operations dashboard",
    brand: "#1d4ed8",
    accent: "#06b6d4",
    trend: "minimal",
    weather: "night",
    mood: "cold",
    density: "compact",
    type: "technical",
    border: "crisp",
    motion: "minimal",
    mode: "dark",
    contrast: "high"
  }
};

export function mergeTokens(tokens: DesignTokens, patch: Partial<DesignTokens>): DesignTokens {
  return {
    ...tokens,
    ...patch,
    knobs: { ...tokens.knobs, ...patch.knobs },
    color: { ...tokens.color, ...patch.color },
    radius: { ...tokens.radius, ...patch.radius },
    spacing: { ...tokens.spacing, ...patch.spacing },
    type: { ...tokens.type, ...patch.type },
    size: { ...tokens.size, ...patch.size },
    shadow: { ...tokens.shadow, ...patch.shadow },
    motion: { ...tokens.motion, ...patch.motion },
    blur: { ...tokens.blur, ...patch.blur },
    opacity: { ...tokens.opacity, ...patch.opacity }
  };
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const value = clean.length === 3
    ? clean.split("").map((char) => `${char}${char}`).join("")
    : clean;
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16)
  ];
}

export function rgbToHex([red, green, blue]: [number, number, number]): string {
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
  return `#${[red, green, blue].map((value) => clamp(value).toString(16).padStart(2, "0")).join("")}`;
}

export function mix(hex: string, target: string, amount: number): string {
  const sourceRgb = hexToRgb(hex);
  const targetRgb = hexToRgb(target);
  return rgbToHex([
    sourceRgb[0] + (targetRgb[0] - sourceRgb[0]) * amount,
    sourceRgb[1] + (targetRgb[1] - sourceRgb[1]) * amount,
    sourceRgb[2] + (targetRgb[2] - sourceRgb[2]) * amount
  ]);
}

export function relativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (rgb[0] ?? 0) + 0.7152 * (rgb[1] ?? 0) + 0.0722 * (rgb[2] ?? 0);
}

export function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

export function bestTextColor(background: string): string {
  return contrastRatio("#ffffff", background) >= contrastRatio("#0f172a", background)
    ? "#ffffff"
    : "#0f172a";
}

export function validateTheme(tokens: DesignTokens): ValidationResult {
  const issues: string[] = [];
  const mainContrast = contrastRatio(tokens.color.text, tokens.color.background);
  const surfaceContrast = contrastRatio(tokens.color.text, tokens.color.surface);
  const brandContrast = contrastRatio(tokens.color.brandContrast, tokens.color.brand);
  const minContrast = tokens.knobs.contrast === "AAA" ? 7 : 4.5;

  if (mainContrast < minContrast) issues.push(`Text/background contrast is ${mainContrast.toFixed(2)}.`);
  if (surfaceContrast < minContrast) issues.push(`Text/surface contrast is ${surfaceContrast.toFixed(2)}.`);
  if (brandContrast < 4.5) issues.push(`Brand contrast is ${brandContrast.toFixed(2)}.`);

  const contrastScore = Math.min(100, Math.round(((mainContrast + surfaceContrast + brandContrast) / 18) * 100));
  const consistencyScore = tokens.knobs.texture === "glass" && tokens.knobs.elevation !== "glass" ? 76 : 94;
  const accessibilityScore = issues.length === 0 ? Math.min(100, contrastScore + 8) : Math.max(52, contrastScore - issues.length * 8);

  return {
    valid: issues.length === 0,
    issues,
    score: {
      contrast: contrastScore,
      consistency: consistencyScore,
      accessibility: accessibilityScore
    }
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}

function readTokenPatch(value: unknown): Partial<DesignTokens> {
  if (!isRecord(value)) return {};
  return value as Partial<DesignTokens>;
}

function normalizeMetadata(metadata: unknown, tokens: DesignTokens): ZenoTokenConfigMetadata {
  const record = isRecord(metadata) ? metadata : {};
  const normalized: ZenoTokenConfigMetadata = {
    name: readString(record.name) ?? tokens.name
  };
  const projectId = readString(record.projectId);
  const environment = readString(record.environment);
  const description = readString(record.description);
  const createdAt = readString(record.createdAt);
  const updatedAt = readString(record.updatedAt);

  if (projectId) normalized.projectId = projectId;
  if (environment) normalized.environment = environment;
  if (description) normalized.description = description;
  if (createdAt) normalized.createdAt = createdAt;
  if (updatedAt) normalized.updatedAt = updatedAt;

  return normalized;
}

function normalizeAssets(assets: unknown): Record<string, ZenoAssetToken> {
  if (!isRecord(assets)) return {};

  return allowedAssetTokenKeys.reduce<Record<string, ZenoAssetToken>>((normalized, key) => {
    const asset = assets[key];
    if (!isRecord(asset)) return normalized;

    const url = readString(asset.url);
    const isSafeUrl = url
      ? url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/")
      : false;

    if (!url || !isSafeUrl) return normalized;

    const token: ZenoAssetToken = { url };
    const alt = readString(asset.alt);
    const hash = readString(asset.hash);
    const width = readNumber(asset.width);
    const height = readNumber(asset.height);

    if (alt) token.alt = alt;
    if (hash) token.hash = hash;
    if (width) token.width = width;
    if (height) token.height = height;

    normalized[key] = token;
    return normalized;
  }, {});
}

function normalizeModes(modes: unknown): Record<string, Partial<DesignTokens>> {
  if (!isRecord(modes)) return {};

  return Object.entries(modes).reduce<Record<string, Partial<DesignTokens>>>((normalized, [mode, patch]) => {
    if (!/^[a-z0-9._-]{1,64}$/i.test(mode) || !isRecord(patch)) return normalized;
    normalized[mode] = readTokenPatch(patch);
    return normalized;
  }, {});
}

export function createZenoTokenConfig({
  metadata,
  tokens,
  assets,
  modes,
  publishedVersion
}: ZenoTokenConfigInput = {}): ZenoTokenConfig {
  const resolvedTokens = mergeTokens(baseTokens, readTokenPatch(tokens));
  const validation = validateTheme(resolvedTokens);
  const config: ZenoTokenConfig = {
    schemaVersion: zenoTokenConfigSchemaVersion,
    metadata: normalizeMetadata(metadata, resolvedTokens),
    tokens: resolvedTokens,
    assets: normalizeAssets(assets),
    modes: normalizeModes(modes),
    validation
  };

  const version = readString(publishedVersion);
  if (version) config.publishedVersion = version;

  return config;
}

export function readZenoTokenConfig(input: unknown): ZenoTokenConfigReadResult {
  const issues: string[] = [];

  if (!isRecord(input)) {
    const config = createZenoTokenConfig({
      metadata: { name: baseTokens.name }
    });
    return {
      valid: false,
      config,
      issues: ["Token config must be an object."]
    };
  }

  const schemaVersion = readString(input.schemaVersion);
  if (schemaVersion !== zenoTokenConfigSchemaVersion) {
    issues.push(`Unsupported token config schema version: ${schemaVersion ?? "missing"}.`);
  }

  if (!isRecord(input.tokens)) {
    issues.push("Token config must include a tokens object.");
  }

  const configInput: ZenoTokenConfigInput = {
    tokens: readTokenPatch(input.tokens)
  };
  const publishedVersion = readString(input.publishedVersion);

  if (isRecord(input.metadata)) configInput.metadata = input.metadata;
  if (isRecord(input.assets)) configInput.assets = input.assets as Record<string, Partial<ZenoAssetToken> | undefined>;
  if (isRecord(input.modes)) configInput.modes = input.modes as Record<string, Partial<DesignTokens> | undefined>;
  if (publishedVersion) configInput.publishedVersion = publishedVersion;

  const config = createZenoTokenConfig(configInput);

  return {
    valid: issues.length === 0 && config.validation.valid,
    config,
    issues: [...issues, ...config.validation.issues]
  };
}
