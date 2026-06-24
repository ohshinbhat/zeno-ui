export type ThemeDensity = "compact" | "cozy" | "spacious";
export type ThemeType = "calm" | "editorial" | "technical" | "playful";
export type ThemeContrast = "normal" | "high" | "AAA";
export type ThemeMode = "light" | "dark" | "adaptive";

export type ThemeKnobs = {
  brand: string;
  accent: string;
  density: ThemeDensity;
  type: ThemeType;
  contrast: ThemeContrast;
  mode: ThemeMode;
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

export const baseTokens: DesignTokens = {
  name: "Clear Minimal",
  id: "clear-minimal",
  seed: "base",
  knobs: {
    brand: "#2563eb",
    accent: "#14b8a6",
    density: "cozy",
    type: "technical",
    contrast: "normal",
    mode: "light"
  },
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
  return isRecord(value) ? value as Partial<DesignTokens> : {};
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

export function validateTheme(tokens: DesignTokens): ValidationResult {
  const hasRequiredColors = Boolean(tokens.color.text && tokens.color.background && tokens.color.brand);
  const issues = hasRequiredColors ? [] : ["Theme must include text, background, and brand colors."];

  return {
    valid: issues.length === 0,
    issues,
    score: {
      contrast: hasRequiredColors ? 90 : 0,
      consistency: 94,
      accessibility: hasRequiredColors ? 92 : 0
    }
  };
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
    return {
      valid: false,
      config: createZenoTokenConfig(),
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
