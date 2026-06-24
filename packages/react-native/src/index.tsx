import * as React from "react";
import {
  Pressable,
  Switch as NativeSwitch,
  Text as NativeText,
  TextInput,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type TextInputProps,
  type TextProps as NativeTextProps,
  type TextStyle,
  type ViewProps,
  type ViewStyle
} from "react-native";
import {
  baseTokens,
  createZenoTokenConfig,
  readZenoTokenConfig,
  type ColorTokens,
  type DesignTokens,
  type ZenoAssetToken,
  type ZenoTokenConfig,
  type ZenoTokenConfigInput
} from "@zeno-ui/tokens";

export type ZenoSize = "$2" | "$3" | "$4" | "$5";
export type ZenoTone = "neutral" | "brand" | "success" | "warning" | "danger";
export type ZenoVariant = "solid" | "soft" | "outline" | "ghost" | "glass";
export type FieldTone = "default" | "danger" | "success";

export type ZenoNativeThemeSource =
  | {
      type: "inline";
      config: ZenoTokenConfig | ZenoTokenConfigInput;
    }
  | {
      type: "url";
      url: string;
      requestInit?: RequestInit;
    }
  | {
      type: "zeno";
      projectId: string;
      environment?: string;
      baseUrl: string;
      requestInit?: RequestInit;
    };

export type ZenoNativeThemeStatus = "fallback" | "loading" | "ready" | "error";

export type ZenoNativeThemeStorage = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
};

export type ZenoNativeTextScale = {
  sans: string;
  display: string;
  mono: string;
  labelFontSize: number;
  bodyFontSize: number;
  titleFontSize: number;
  displayFontSize: number;
  labelLineHeight: number;
  bodyLineHeight: number;
  titleLineHeight: number;
  displayLineHeight: number;
};

export type ZenoNativeTheme = {
  config: ZenoTokenConfig;
  tokens: DesignTokens;
  colors: ColorTokens;
  radius: { [Key in keyof DesignTokens["radius"]]: number };
  spacing: { [Key in keyof DesignTokens["spacing"]]: number };
  size: { [Key in keyof DesignTokens["size"]]: number };
  type: ZenoNativeTextScale;
  opacity: {
    glass: number;
    disabled: number;
  };
};

export type ZenoNativeThemeContextValue = {
  theme: ZenoNativeTheme;
  config: ZenoTokenConfig;
  status: ZenoNativeThemeStatus;
  error: string | null;
  version: string | null;
  assets: Record<string, ZenoAssetToken>;
  reload: () => Promise<void>;
};

export type ZenoNativeProviderProps = {
  children: React.ReactNode;
  source?: ZenoNativeThemeSource;
  fallbackConfig?: ZenoTokenConfig | ZenoTokenConfigInput;
  storage?: ZenoNativeThemeStorage;
  storageKey?: string;
  disableCache?: boolean;
};

export const defaultZenoNativeConfig = createZenoTokenConfig({
  metadata: {
    name: "Zeno Native Default",
    projectId: "local",
    environment: "fallback"
  },
  tokens: baseTokens
});

const NativeThemeContext = React.createContext<ZenoNativeThemeContextValue | null>(null);

const sizeKeys = {
  $2: {
    control: "control2",
    icon: "icon2",
    paddingX: "paddingX2",
    paddingY: "paddingY2",
    gap: "gap2"
  },
  $3: {
    control: "control3",
    icon: "icon3",
    paddingX: "paddingX3",
    paddingY: "paddingY3",
    gap: "gap3"
  },
  $4: {
    control: "control4",
    icon: "icon4",
    paddingX: "paddingX4",
    paddingY: "paddingY4",
    gap: "gap4"
  },
  $5: {
    control: "control5",
    icon: "icon5",
    paddingX: "paddingX5",
    paddingY: "paddingY5",
    gap: "gap5"
  }
} as const;

function tokenPx(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return fallback;
  if (value.endsWith("rem")) return numeric * 16;
  return numeric;
}

function tokenNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeModernRgb(value: string): string {
  const match = value.match(/^rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([0-9.]+)\)$/i);
  if (!match) return value;
  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${match[4]})`;
}

function normalizeColors(colors: ColorTokens): ColorTokens {
  return {
    ...colors,
    background: normalizeModernRgb(colors.background),
    surface: normalizeModernRgb(colors.surface),
    surfaceRaised: normalizeModernRgb(colors.surfaceRaised),
    surfaceGlass: normalizeModernRgb(colors.surfaceGlass),
    text: normalizeModernRgb(colors.text),
    textMuted: normalizeModernRgb(colors.textMuted),
    border: normalizeModernRgb(colors.border),
    brand: normalizeModernRgb(colors.brand),
    brandContrast: normalizeModernRgb(colors.brandContrast),
    accent: normalizeModernRgb(colors.accent),
    accentContrast: normalizeModernRgb(colors.accentContrast),
    success: normalizeModernRgb(colors.success),
    warning: normalizeModernRgb(colors.warning),
    danger: normalizeModernRgb(colors.danger)
  };
}

function firstFontFamily(value: string, fallback: string): string {
  const first = value.split(",")[0]?.trim().replace(/^["']|["']$/g, "");
  return first && !first.startsWith("ui-") ? first : fallback;
}

function normalizeConfig(config: ZenoTokenConfig | ZenoTokenConfigInput): ZenoTokenConfig {
  return readZenoTokenConfig(config).config;
}

export function createZenoNativeTheme(
  config: ZenoTokenConfig | ZenoTokenConfigInput = defaultZenoNativeConfig
): ZenoNativeTheme {
  const normalized = normalizeConfig(config);
  const tokens = normalized.tokens;

  return {
    config: normalized,
    tokens,
    colors: normalizeColors(tokens.color),
    radius: {
      control: tokenPx(tokens.radius.control, 12),
      card: tokenPx(tokens.radius.card, 16),
      pill: tokenPx(tokens.radius.pill, 999)
    },
    spacing: {
      card: tokenPx(tokens.spacing.card, 16),
      section: tokenPx(tokens.spacing.section, 32),
      gap2: tokenPx(tokens.spacing.gap2, 6),
      gap3: tokenPx(tokens.spacing.gap3, 8),
      gap4: tokenPx(tokens.spacing.gap4, 12),
      gap5: tokenPx(tokens.spacing.gap5, 16)
    },
    size: {
      control2: tokenPx(tokens.size.control2, 32),
      control3: tokenPx(tokens.size.control3, 40),
      control4: tokenPx(tokens.size.control4, 48),
      control5: tokenPx(tokens.size.control5, 56),
      icon2: tokenPx(tokens.size.icon2, 14),
      icon3: tokenPx(tokens.size.icon3, 16),
      icon4: tokenPx(tokens.size.icon4, 18),
      icon5: tokenPx(tokens.size.icon5, 20),
      paddingX2: tokenPx(tokens.size.paddingX2, 12),
      paddingX3: tokenPx(tokens.size.paddingX3, 16),
      paddingX4: tokenPx(tokens.size.paddingX4, 20),
      paddingX5: tokenPx(tokens.size.paddingX5, 24),
      paddingY2: tokenPx(tokens.size.paddingY2, 6),
      paddingY3: tokenPx(tokens.size.paddingY3, 10),
      paddingY4: tokenPx(tokens.size.paddingY4, 12),
      paddingY5: tokenPx(tokens.size.paddingY5, 14)
    },
    type: {
      sans: firstFontFamily(tokens.type.sans, "System"),
      display: firstFontFamily(tokens.type.display, "System"),
      mono: firstFontFamily(tokens.type.mono, "Courier"),
      labelFontSize: tokenPx(tokens.type.label, 13),
      bodyFontSize: tokenPx(tokens.type.body, 15),
      titleFontSize: tokenPx(tokens.type.title, 24),
      displayFontSize: tokenPx(tokens.type.displaySize, 48),
      labelLineHeight: tokenPx(tokens.type.labelLine, 16),
      bodyLineHeight: tokenPx(tokens.type.bodyLine, 24),
      titleLineHeight: tokenPx(tokens.type.titleLine, 30),
      displayLineHeight: tokenPx(tokens.type.displayLine, 52)
    },
    opacity: {
      glass: tokenNumber(tokens.opacity.glass, 0.76),
      disabled: tokenNumber(tokens.opacity.disabled, 0.55)
    }
  };
}

function sourceToUrl(source: Exclude<ZenoNativeThemeSource, { type: "inline" }>): string {
  if (source.type === "url") return source.url;

  const baseUrl = source.baseUrl.replace(/\/+$/g, "");
  const environment = encodeURIComponent(source.environment ?? "production");
  return `${baseUrl}/api/themes/${encodeURIComponent(source.projectId)}/${environment}.json`;
}

function sourceCacheKey(source: ZenoNativeThemeSource | undefined): string {
  if (!source) return "zeno-ui-native-theme:fallback";
  if (source.type === "inline") return "zeno-ui-native-theme:inline";
  return `zeno-ui-native-theme:${sourceToUrl(source)}`;
}

async function readCachedConfig(storage: ZenoNativeThemeStorage | undefined, key: string): Promise<ZenoTokenConfig | null> {
  if (!storage) return null;

  try {
    const raw = await storage.getItem(key);
    if (!raw) return null;
    const result = readZenoTokenConfig(JSON.parse(raw) as unknown);
    return result.valid ? result.config : null;
  } catch {
    return null;
  }
}

async function writeCachedConfig(
  storage: ZenoNativeThemeStorage | undefined,
  key: string,
  config: ZenoTokenConfig
): Promise<void> {
  if (!storage) return;

  try {
    await storage.setItem(key, JSON.stringify(config));
  } catch {
    // Cache writes should not block a valid runtime theme.
  }
}

export async function loadZenoNativeTheme(source: ZenoNativeThemeSource): Promise<ZenoTokenConfig> {
  if (source.type === "inline") {
    const result = readZenoTokenConfig(source.config);
    if (!result.valid) throw new Error(result.issues.join(" ") || "Inline token config is invalid.");
    return result.config;
  }

  const response = await fetch(sourceToUrl(source), {
    cache: "no-store",
    ...(source.requestInit ?? {})
  });

  if (!response.ok) {
    throw new Error(`Theme request failed with ${response.status}.`);
  }

  const result = readZenoTokenConfig(await response.json() as unknown);
  if (!result.valid) throw new Error(result.issues.join(" ") || "Remote token config is invalid.");
  return result.config;
}

export function ZenoNativeProvider({
  children,
  source,
  fallbackConfig = defaultZenoNativeConfig,
  storage,
  storageKey,
  disableCache = false
}: ZenoNativeProviderProps): React.ReactElement {
  const fallbackTheme = React.useMemo(() => createZenoNativeTheme(fallbackConfig), [fallbackConfig]);
  const cacheKey = React.useMemo(() => storageKey ?? sourceCacheKey(source), [source, storageKey]);
  const [theme, setTheme] = React.useState<ZenoNativeTheme>(fallbackTheme);
  const [status, setStatus] = React.useState<ZenoNativeThemeStatus>("fallback");
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (!source) {
      setTheme(fallbackTheme);
      setStatus("fallback");
      setError(null);
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const loadedConfig = await loadZenoNativeTheme(source);
      setTheme(createZenoNativeTheme(loadedConfig));
      setStatus("ready");
      if (!disableCache) await writeCachedConfig(storage, cacheKey, loadedConfig);
    } catch (themeError) {
      const cached = disableCache ? null : await readCachedConfig(storage, cacheKey);
      const message = themeError instanceof Error ? themeError.message : "Theme request failed.";
      setError(message);

      if (cached) {
        setTheme(createZenoNativeTheme(cached));
        setStatus("ready");
        return;
      }

      setTheme(fallbackTheme);
      setStatus("error");
    }
  }, [cacheKey, disableCache, fallbackTheme, source, storage]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const context = React.useMemo<ZenoNativeThemeContextValue>(() => ({
    theme,
    config: theme.config,
    status,
    error,
    version: theme.config.publishedVersion ?? null,
    assets: theme.config.assets,
    reload: load
  }), [error, load, status, theme]);

  return (
    <NativeThemeContext.Provider value={context}>
      {children}
    </NativeThemeContext.Provider>
  );
}

export function useZenoNativeTheme(): ZenoNativeThemeContextValue {
  const context = React.useContext(NativeThemeContext);
  if (!context) {
    throw new Error("useZenoNativeTheme must be used inside ZenoNativeProvider.");
  }

  return context;
}

export function useZenoNativeAsset(key: string): ZenoAssetToken | null {
  return useZenoNativeTheme().assets[key] ?? null;
}

function useNativeTheme(): ZenoNativeTheme {
  const context = React.useContext(NativeThemeContext);
  return context?.theme ?? createZenoNativeTheme();
}

function isHexColor(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value);
}

function hexChannel(value: string, start: number): number {
  return Number.parseInt(value.slice(start, start + 2), 16);
}

function colorWithAlpha(value: string, alpha: number): string {
  if (!isHexColor(value)) return value;
  return `rgba(${hexChannel(value, 1)}, ${hexChannel(value, 3)}, ${hexChannel(value, 5)}, ${alpha})`;
}

function readableTextColor(background: string, dark: string, light: string): string {
  if (!isHexColor(background)) return dark;

  const red = hexChannel(background, 1) / 255;
  const green = hexChannel(background, 3) / 255;
  const blue = hexChannel(background, 5) / 255;
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  return luminance > 0.58 ? dark : light;
}

function toneColor(theme: ZenoNativeTheme, tone: ZenoTone): string {
  if (tone === "brand") return theme.colors.brand;
  if (tone === "success") return theme.colors.success;
  if (tone === "warning") return theme.colors.warning;
  if (tone === "danger") return theme.colors.danger;
  return theme.colors.text;
}

function toneContrast(theme: ZenoNativeTheme, tone: ZenoTone): string {
  if (tone === "brand") return theme.colors.brandContrast;
  if (tone === "neutral") return theme.colors.background;
  return readableTextColor(toneColor(theme, tone), theme.colors.text, theme.colors.background);
}

function toneVariantStyle(theme: ZenoNativeTheme, tone: ZenoTone, variant: ZenoVariant): {
  frame: ViewStyle;
  text: TextStyle;
} {
  const color = toneColor(theme, tone);

  if (variant === "solid") {
    return {
      frame: {
        backgroundColor: color,
        borderColor: color
      },
      text: {
        color: toneContrast(theme, tone)
      }
    };
  }

  if (variant === "soft") {
    return {
      frame: {
        backgroundColor: colorWithAlpha(color, 0.12),
        borderColor: colorWithAlpha(color, 0.22)
      },
      text: {
        color
      }
    };
  }

  if (variant === "outline") {
    return {
      frame: {
        backgroundColor: "transparent",
        borderColor: color
      },
      text: {
        color
      }
    };
  }

  if (variant === "ghost") {
    return {
      frame: {
        backgroundColor: "transparent",
        borderColor: "transparent"
      },
      text: {
        color
      }
    };
  }

  return {
    frame: {
      backgroundColor: theme.colors.surfaceGlass,
      borderColor: theme.colors.border
    },
    text: {
      color
    }
  };
}

function textSizeStyle(theme: ZenoNativeTheme, size: TextProps["size"]): TextStyle {
  if (size === "label") {
    return {
      fontSize: theme.type.labelFontSize,
      lineHeight: theme.type.labelLineHeight
    };
  }

  if (size === "title") {
    return {
      fontSize: theme.type.titleFontSize,
      lineHeight: theme.type.titleLineHeight,
      fontFamily: theme.type.display
    };
  }

  if (size === "display") {
    return {
      fontSize: theme.type.displayFontSize,
      lineHeight: theme.type.displayLineHeight,
      fontFamily: theme.type.display
    };
  }

  return {
    fontSize: theme.type.bodyFontSize,
    lineHeight: theme.type.bodyLineHeight
  };
}

function textToneColor(theme: ZenoNativeTheme, tone: TextProps["tone"]): string {
  if (tone === "muted") return theme.colors.textMuted;
  if (tone === "brand") return theme.colors.brand;
  if (tone === "danger") return theme.colors.danger;
  if (tone === "success") return theme.colors.success;
  return theme.colors.text;
}

function textWeightValue(weight: TextProps["weight"]): TextStyle {
  if (weight === "medium") return { fontWeight: "500" };
  if (weight === "semibold") return { fontWeight: "600" };
  if (weight === "bold") return { fontWeight: "700" };
  return { fontWeight: "400" };
}

function gapValue(theme: ZenoNativeTheme, gap: ZenoSize | "none"): number {
  if (gap === "none") return 0;
  return theme.spacing[sizeKeys[gap].gap];
}

export type StackProps = ViewProps & {
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: ZenoSize | "none";
  wrap?: boolean;
};

export function Stack({
  direction = "column",
  align = "stretch",
  justify = "start",
  gap = "$3",
  wrap = false,
  style,
  ...props
}: StackProps): React.ReactElement {
  const theme = useNativeTheme();
  const alignItems = align === "start" ? "flex-start" : align === "end" ? "flex-end" : align;
  const justifyContent = justify === "start"
    ? "flex-start"
    : justify === "end"
      ? "flex-end"
      : justify === "between"
        ? "space-between"
        : "center";

  return (
    <View
      style={[{
        display: "flex",
        flexDirection: direction,
        alignItems,
        justifyContent,
        gap: gapValue(theme, gap),
        flexWrap: wrap ? "wrap" : "nowrap"
      }, style]}
      {...props}
    />
  );
}

export type TextProps = NativeTextProps & {
  size?: "label" | "body" | "title" | "display";
  tone?: "default" | "muted" | "brand" | "danger" | "success";
  weight?: "regular" | "medium" | "semibold" | "bold";
};

export function Text({
  size = "body",
  tone = "default",
  weight = "regular",
  style,
  ...props
}: TextProps): React.ReactElement {
  const theme = useNativeTheme();

  return (
    <NativeText
      style={[{
        color: textToneColor(theme, tone),
        fontFamily: size === "title" || size === "display" ? theme.type.display : theme.type.sans
      }, textSizeStyle(theme, size), textWeightValue(weight), style]}
      {...props}
    />
  );
}

function controlFrameStyle(theme: ZenoNativeTheme, size: ZenoSize, circular: boolean): ViewStyle {
  const keys = sizeKeys[size];
  return {
    minHeight: theme.size[keys.control],
    paddingHorizontal: circular ? 0 : theme.size[keys.paddingX],
    paddingVertical: theme.size[keys.paddingY],
    borderRadius: circular ? theme.radius.pill : theme.radius.control,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.spacing[keys.gap]
  };
}

function controlTextStyle(theme: ZenoNativeTheme, size: ZenoSize): TextStyle {
  return {
    fontFamily: theme.type.sans,
    fontSize: size === "$2" || size === "$3" ? theme.type.labelFontSize : theme.type.bodyFontSize,
    lineHeight: size === "$2" || size === "$3" ? theme.type.labelLineHeight : theme.type.bodyLineHeight,
    fontWeight: "600"
  };
}

function renderTextChild(child: React.ReactNode, style: StyleProp<TextStyle>): React.ReactNode {
  if (typeof child === "string" || typeof child === "number") {
    return <NativeText style={style}>{child}</NativeText>;
  }

  return child;
}

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  children?: React.ReactNode;
  label?: string;
  size?: ZenoSize;
  tone?: ZenoTone;
  variant?: ZenoVariant;
  circular?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function ButtonRoot({
  children,
  label,
  size = "$3",
  tone = "brand",
  variant = "solid",
  circular = false,
  disabled,
  style,
  textStyle,
  accessibilityRole = "button",
  ...props
}: ButtonProps): React.ReactElement {
  const theme = useNativeTheme();
  const variantStyle = toneVariantStyle(theme, tone, variant);
  const content = children ?? label;
  const resolvedTextStyle = [controlTextStyle(theme, size), variantStyle.text, textStyle];

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      style={[
        controlFrameStyle(theme, size, circular),
        variantStyle.frame,
        disabled && { opacity: theme.opacity.disabled },
        style
      ]}
      {...props}
    >
      {renderTextChild(content, resolvedTextStyle)}
    </Pressable>
  );
}

function ButtonText({ style, ...props }: NativeTextProps): React.ReactElement {
  const theme = useNativeTheme();
  return <NativeText style={[controlTextStyle(theme, "$3"), { color: theme.colors.text }, style]} {...props} />;
}

function ButtonIcon({ style, ...props }: ViewProps): React.ReactElement {
  const theme = useNativeTheme();
  return (
    <View
      style={[{
        width: theme.size.icon3,
        height: theme.size.icon3,
        alignItems: "center",
        justifyContent: "center"
      }, style]}
      {...props}
    />
  );
}

export const Button = Object.assign(ButtonRoot, {
  Text: ButtonText,
  Icon: ButtonIcon
});

export type BadgeProps = ViewProps & {
  children?: React.ReactNode;
  size?: ZenoSize;
  tone?: ZenoTone;
  variant?: ZenoVariant;
  textStyle?: StyleProp<TextStyle>;
};

export function Badge({
  children,
  size = "$2",
  tone = "neutral",
  variant = "soft",
  style,
  textStyle,
  ...props
}: BadgeProps): React.ReactElement {
  const theme = useNativeTheme();
  const variantStyle = toneVariantStyle(theme, tone, variant);

  return (
    <View
      style={[controlFrameStyle(theme, size, false), {
        alignSelf: "flex-start",
        minHeight: theme.size[sizeKeys[size].control] * 0.78
      }, variantStyle.frame, style]}
      {...props}
    >
      {renderTextChild(children, [controlTextStyle(theme, size), variantStyle.text, textStyle])}
    </View>
  );
}

export type CardProps = ViewProps & {
  variant?: "surface" | "raised" | "glass";
  interactive?: boolean;
};

function CardRoot({
  variant = "surface",
  interactive = false,
  style,
  ...props
}: CardProps): React.ReactElement {
  const theme = useNativeTheme();
  const backgroundColor = variant === "glass"
    ? theme.colors.surfaceGlass
    : variant === "raised"
      ? theme.colors.surfaceRaised
      : theme.colors.surface;

  return (
    <View
      style={[{
        backgroundColor,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.card,
        borderWidth: 1,
        padding: theme.spacing.card,
        shadowColor: theme.colors.text,
        shadowOpacity: variant === "surface" ? 0 : 0.16,
        shadowRadius: variant === "glass" ? 18 : 12,
        shadowOffset: { width: 0, height: interactive ? 10 : 6 }
      }, style]}
      {...props}
    />
  );
}

function CardHeader({ style, ...props }: ViewProps): React.ReactElement {
  const theme = useNativeTheme();
  return <View style={[{ marginBottom: theme.spacing.gap5, gap: theme.spacing.gap3 }, style]} {...props} />;
}

function CardContent({ style, ...props }: ViewProps): React.ReactElement {
  return <View style={style} {...props} />;
}

function CardFooter({ style, ...props }: ViewProps): React.ReactElement {
  const theme = useNativeTheme();
  return (
    <View
      style={[{
        marginTop: theme.spacing.gap5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.gap3
      }, style]}
      {...props}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter
});

function fieldToneColor(theme: ZenoNativeTheme, tone: FieldTone): string {
  if (tone === "danger") return theme.colors.danger;
  if (tone === "success") return theme.colors.success;
  return theme.colors.border;
}

function inputStyle(theme: ZenoNativeTheme, tone: FieldTone): TextStyle {
  return {
    minHeight: theme.size.control3,
    borderColor: fieldToneColor(theme, tone),
    borderRadius: theme.radius.control,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    paddingHorizontal: theme.size.paddingX3,
    paddingVertical: theme.size.paddingY3,
    fontFamily: theme.type.sans,
    fontSize: theme.type.bodyFontSize,
    lineHeight: theme.type.bodyLineHeight
  };
}

type FieldShellProps = {
  label?: string | undefined;
  hint?: string | undefined;
  tone?: FieldTone;
  disabled?: boolean;
  children: React.ReactNode;
};

function FieldShell({ label, hint, tone = "default", disabled = false, children }: FieldShellProps): React.ReactElement {
  const theme = useNativeTheme();
  const hintTone = tone === "danger" ? "danger" : tone === "success" ? "success" : "muted";

  return (
    <View style={{ gap: theme.spacing.gap2, opacity: disabled ? theme.opacity.disabled : 1 }}>
      {label ? <Text size="label" tone="muted" weight="medium">{label}</Text> : null}
      {children}
      {hint ? <Text size="label" tone={hintTone}>{hint}</Text> : null}
    </View>
  );
}

export type InputProps = Omit<TextInputProps, "style"> & {
  label?: string;
  hint?: string;
  tone?: FieldTone;
  style?: StyleProp<TextStyle>;
};

export function Input({
  label,
  hint,
  tone = "default",
  editable = true,
  placeholderTextColor,
  style,
  ...props
}: InputProps): React.ReactElement {
  const theme = useNativeTheme();

  return (
    <FieldShell label={label} hint={hint} tone={tone} disabled={!editable}>
      <TextInput
        editable={editable}
        placeholderTextColor={placeholderTextColor ?? theme.colors.textMuted}
        style={[inputStyle(theme, tone), !editable && { opacity: theme.opacity.disabled }, style]}
        {...props}
      />
    </FieldShell>
  );
}

export type TextareaProps = InputProps & {
  minRows?: number;
};

export function Textarea({
  minRows = 4,
  multiline = true,
  numberOfLines,
  style,
  ...props
}: TextareaProps): React.ReactElement {
  const theme = useNativeTheme();
  const rows = numberOfLines ?? minRows;

  return (
    <Input
      multiline={multiline}
      numberOfLines={rows}
      style={[{
        minHeight: theme.type.bodyLineHeight * rows + theme.size.paddingY3 * 2,
        textAlignVertical: "top"
      }, style]}
      {...props}
    />
  );
}

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<PressableProps, "children" | "style"> & {
  label?: string;
  hint?: string;
  tone?: FieldTone;
  value?: string;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Select({
  label,
  hint,
  tone = "default",
  value,
  placeholder = "Select",
  options,
  disabled = false,
  style,
  textStyle,
  accessibilityRole = "button",
  ...props
}: SelectProps): React.ReactElement {
  const theme = useNativeTheme();
  const selected = options?.find((option) => option.value === value);
  const displayValue = selected?.label ?? value ?? placeholder;
  const isPlaceholder = !selected && !value;

  return (
    <FieldShell label={label} hint={hint} tone={tone} disabled={disabled}>
      <Pressable
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled, expanded: false }}
        disabled={disabled}
        style={[inputStyle(theme, tone), {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: disabled ? theme.opacity.disabled : 1
        }, style]}
        {...props}
      >
        <NativeText
          style={[{
            color: isPlaceholder ? theme.colors.textMuted : theme.colors.text,
            fontFamily: theme.type.sans,
            fontSize: theme.type.bodyFontSize,
            lineHeight: theme.type.bodyLineHeight
          }, textStyle]}
        >
          {displayValue}
        </NativeText>
        <NativeText style={{ color: theme.colors.textMuted, fontSize: theme.type.bodyFontSize }}>v</NativeText>
      </Pressable>
    </FieldShell>
  );
}

export type CheckboxProps = Omit<PressableProps, "style"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  tone?: ZenoTone;
  style?: StyleProp<ViewStyle>;
};

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  hint,
  tone = "brand",
  disabled = false,
  style,
  onPress,
  accessibilityRole = "checkbox",
  ...props
}: CheckboxProps): React.ReactElement {
  const theme = useNativeTheme();
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const color = toneColor(theme, tone);

  function handlePress(event: GestureResponderEvent): void {
    onPress?.(event);
    const nextChecked = !resolvedChecked;
    if (!isControlled) setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: resolvedChecked, disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={[{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: theme.spacing.gap3,
        opacity: disabled ? theme.opacity.disabled : 1
      }, style]}
      {...props}
    >
      <View style={{
        width: 18,
        height: 18,
        marginTop: 2,
        borderRadius: theme.radius.control * 0.35,
        borderWidth: 1,
        borderColor: resolvedChecked ? color : theme.colors.border,
        backgroundColor: resolvedChecked ? color : theme.colors.surface,
        alignItems: "center",
        justifyContent: "center"
      }}>
        {resolvedChecked ? (
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 2,
            backgroundColor: toneContrast(theme, tone)
          }} />
        ) : null}
      </View>
      {label || hint ? (
        <View style={{ flex: 1, gap: theme.spacing.gap2 }}>
          {label ? <Text weight="medium">{label}</Text> : null}
          {hint ? <Text size="label" tone="muted">{hint}</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
}

export type SwitchProps = ViewProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  tone?: ZenoTone;
  disabled?: boolean;
};

export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  hint,
  tone = "brand",
  disabled = false,
  style,
  ...props
}: SwitchProps): React.ReactElement {
  const theme = useNativeTheme();
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const resolvedChecked = isControlled ? checked : internalChecked;
  const color = toneColor(theme, tone);

  function handleValueChange(nextChecked: boolean): void {
    if (!isControlled) setInternalChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <View
      style={[{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: theme.spacing.gap3,
        opacity: disabled ? theme.opacity.disabled : 1
      }, style]}
      {...props}
    >
      <NativeSwitch
        value={resolvedChecked}
        disabled={disabled}
        onValueChange={handleValueChange}
        trackColor={{
          false: theme.colors.surfaceRaised,
          true: colorWithAlpha(color, 0.45)
        }}
        thumbColor={resolvedChecked ? color : theme.colors.surface}
      />
      {label || hint ? (
        <View style={{ flex: 1, gap: theme.spacing.gap2 }}>
          {label ? <Text weight="medium">{label}</Text> : null}
          {hint ? <Text size="label" tone="muted">{hint}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

export type SeparatorProps = ViewProps & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({
  orientation = "horizontal",
  style,
  ...props
}: SeparatorProps): React.ReactElement {
  const theme = useNativeTheme();

  return (
    <View
      accessibilityRole="none"
      style={[{
        backgroundColor: theme.colors.border,
        height: orientation === "horizontal" ? 1 : "100%",
        minHeight: orientation === "vertical" ? theme.size.control3 : 1,
        width: orientation === "horizontal" ? "100%" : 1
      }, style]}
      {...props}
    />
  );
}

export type { ZenoAssetToken, ZenoTokenConfig, ZenoTokenConfigInput };
