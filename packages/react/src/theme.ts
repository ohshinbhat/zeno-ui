import { CreateZenoThemeScriptOptions, ZenoHostedThemeSource, ZenoTokenConfig, ZenoThemeSource } from "./types";

type UnknownRecord = Record<string, unknown>;

const DEFAULT_KNOBS = {
  brand: "zeno",
  accent: "sky",
  trend: "balanced",
  weather: "clear",
  density: "comfortable",
  type: "modern",
  elevation: "soft",
  border: "rounded",
  motion: "gentle",
  texture: "clean",
  contrast: "aa",
  mode: "light",
  mood: "focused"
} as const;

const DEFAULT_SCORE = {
  contrast: 96,
  consistency: 94,
  accessibility: 95
} as const;

export const defaultZenoTheme: ZenoTokenConfig = {
  schemaVersion: "1.0.0",
  metadata: {
    name: "Zeno Core",
    description: "Default semantic token contract for Zeno UI."
  },
  tokens: {
    name: "Zeno Core",
    id: "zeno-core",
    seed: "zeno-core",
    knobs: { ...DEFAULT_KNOBS },
    color: {
      "bg.canvas": "#f4f7fb",
      "bg.surface": "#ffffff",
      "bg.subtle": "#e9effd",
      "bg.strong": "#10213a",
      "border.default": "#d3dce8",
      "border.strong": "#9fb0c5",
      "text.primary": "#10213a",
      "text.secondary": "#53627a",
      "text.inverse": "#ffffff",
      "brand.primary": "#2851ff",
      "brand.secondary": "#dce4ff",
      "brand.strong": "#1636c4",
      "status.success": "#0b8f5a",
      "status.danger": "#d14343",
      "focus.ring": "#81a1ff"
    },
    radius: {
      sm: "10px",
      md: "16px",
      lg: "22px",
      pill: "999px"
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      "2xl": "32px"
    },
    type: {
      caption: "13px",
      label: "14px",
      body: "16px",
      title: "28px"
    },
    size: {
      controlSm: "36px",
      controlMd: "44px",
      controlLg: "52px",
      contentWidth: "720px"
    },
    shadow: {
      card: "0 12px 30px rgba(16, 33, 58, 0.1)",
      focus: "0 0 0 3px rgba(129, 161, 255, 0.35)"
    },
    motion: {
      fast: "120ms",
      normal: "180ms",
      slow: "280ms"
    },
    blur: {
      glass: "0px"
    },
    opacity: {
      glass: "0.86",
      disabled: "0.56"
    }
  },
  assets: {},
  modes: {
    dark: {
      color: {
        "bg.canvas": "#08111f",
        "bg.surface": "#10213a",
        "bg.subtle": "#18304f",
        "bg.strong": "#f4f7fb",
        "border.default": "#284464",
        "border.strong": "#4a688b",
        "text.primary": "#f4f7fb",
        "text.secondary": "#b3c5da",
        "text.inverse": "#08111f",
        "brand.primary": "#8ba7ff",
        "brand.secondary": "#1d3257",
        "brand.strong": "#bfd0ff",
        "status.success": "#6bdfac",
        "status.danger": "#ff9b9b",
        "focus.ring": "#b4c7ff"
      }
    }
  },
  validation: {
    valid: true,
    issues: [],
    score: { ...DEFAULT_SCORE }
  }
};

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeStringMap = (
  fallback: Record<string, string>,
  incoming: unknown
): Record<string, string> => {
  if (!isRecord(incoming)) {
    return { ...fallback };
  }

  const result: Record<string, string> = { ...fallback };

  for (const [key, value] of Object.entries(incoming)) {
    if (typeof value === "string" && value.trim()) {
      result[key] = value;
    }
  }

  return result;
};

const mergeAssets = (incoming: unknown): ZenoTokenConfig["assets"] => {
  if (!isRecord(incoming)) {
    return {};
  }

  const assets: ZenoTokenConfig["assets"] = {};

  for (const [key, value] of Object.entries(incoming)) {
    if (!isRecord(value) || typeof value.url !== "string") {
      continue;
    }

    assets[key] = {
      url: value.url,
      alt: typeof value.alt === "string" ? value.alt : undefined,
      width: typeof value.width === "number" ? value.width : undefined,
      height: typeof value.height === "number" ? value.height : undefined,
      hash: typeof value.hash === "string" ? value.hash : undefined
    };
  }

  return assets;
};

const mergeModes = (incoming: unknown): ZenoTokenConfig["modes"] => {
  if (!isRecord(incoming)) {
    return { ...defaultZenoTheme.modes };
  }

  const result: ZenoTokenConfig["modes"] = { ...defaultZenoTheme.modes };

  for (const [modeName, value] of Object.entries(incoming)) {
    if (!isRecord(value)) {
      continue;
    }

    result[modeName] = {
      color: mergeStringMap(defaultZenoTheme.tokens.color, value.color),
      radius: mergeStringMap(defaultZenoTheme.tokens.radius, value.radius),
      spacing: mergeStringMap(defaultZenoTheme.tokens.spacing, value.spacing),
      type: mergeStringMap(defaultZenoTheme.tokens.type, value.type),
      size: mergeStringMap(defaultZenoTheme.tokens.size, value.size),
      shadow: mergeStringMap(defaultZenoTheme.tokens.shadow, value.shadow),
      motion: mergeStringMap(defaultZenoTheme.tokens.motion, value.motion),
      blur: {
        glass:
          isRecord(value.blur) && typeof value.blur.glass === "string"
            ? value.blur.glass
            : defaultZenoTheme.tokens.blur.glass
      },
      opacity: {
        glass:
          isRecord(value.opacity) && typeof value.opacity.glass === "string"
            ? value.opacity.glass
            : defaultZenoTheme.tokens.opacity.glass,
        disabled:
          isRecord(value.opacity) && typeof value.opacity.disabled === "string"
            ? value.opacity.disabled
            : defaultZenoTheme.tokens.opacity.disabled
      }
    };
  }

  return result;
};

export const normalizeZenoTheme = (candidate: unknown): ZenoTokenConfig => {
  if (!isRecord(candidate)) {
    return { ...defaultZenoTheme };
  }

  const metadata = isRecord(candidate.metadata) ? candidate.metadata : {};
  const tokens = isRecord(candidate.tokens) ? candidate.tokens : {};
  const validation = isRecord(candidate.validation) ? candidate.validation : {};
  const score = isRecord(validation.score) ? validation.score : {};

  return {
    schemaVersion: candidate.schemaVersion === "1.0.0" ? "1.0.0" : "1.0.0",
    metadata: {
      name:
        typeof metadata.name === "string" && metadata.name.trim()
          ? metadata.name
          : defaultZenoTheme.metadata.name,
      projectId: typeof metadata.projectId === "string" ? metadata.projectId : undefined,
      environment:
        typeof metadata.environment === "string" ? metadata.environment : undefined,
      description:
        typeof metadata.description === "string"
          ? metadata.description
          : defaultZenoTheme.metadata.description,
      createdAt: typeof metadata.createdAt === "string" ? metadata.createdAt : undefined,
      updatedAt: typeof metadata.updatedAt === "string" ? metadata.updatedAt : undefined
    },
    tokens: {
      name:
        typeof tokens.name === "string" && tokens.name.trim()
          ? tokens.name
          : defaultZenoTheme.tokens.name,
      id:
        typeof tokens.id === "string" && tokens.id.trim()
          ? tokens.id
          : defaultZenoTheme.tokens.id,
      seed:
        typeof tokens.seed === "string" && tokens.seed.trim()
          ? tokens.seed
          : defaultZenoTheme.tokens.seed,
      knobs: {
        ...DEFAULT_KNOBS,
        ...(isRecord(tokens.knobs)
          ? Object.fromEntries(
              Object.entries(tokens.knobs).filter(([, value]) => typeof value === "string")
            )
          : {})
      },
      color: mergeStringMap(defaultZenoTheme.tokens.color, tokens.color),
      radius: mergeStringMap(defaultZenoTheme.tokens.radius, tokens.radius),
      spacing: mergeStringMap(defaultZenoTheme.tokens.spacing, tokens.spacing),
      type: mergeStringMap(defaultZenoTheme.tokens.type, tokens.type),
      size: mergeStringMap(defaultZenoTheme.tokens.size, tokens.size),
      shadow: mergeStringMap(defaultZenoTheme.tokens.shadow, tokens.shadow),
      motion: mergeStringMap(defaultZenoTheme.tokens.motion, tokens.motion),
      blur: {
        glass:
          isRecord(tokens.blur) && typeof tokens.blur.glass === "string"
            ? tokens.blur.glass
            : defaultZenoTheme.tokens.blur.glass
      },
      opacity: {
        glass:
          isRecord(tokens.opacity) && typeof tokens.opacity.glass === "string"
            ? tokens.opacity.glass
            : defaultZenoTheme.tokens.opacity.glass,
        disabled:
          isRecord(tokens.opacity) && typeof tokens.opacity.disabled === "string"
            ? tokens.opacity.disabled
            : defaultZenoTheme.tokens.opacity.disabled
      }
    },
    assets: mergeAssets(candidate.assets),
    modes: mergeModes(candidate.modes),
    publishedVersion:
      typeof candidate.publishedVersion === "string" ? candidate.publishedVersion : undefined,
    validation: {
      valid: validation.valid !== false,
      issues: Array.isArray(validation.issues)
        ? validation.issues.filter((value): value is string => typeof value === "string")
        : [],
      score: {
        contrast:
          typeof score.contrast === "number" ? score.contrast : DEFAULT_SCORE.contrast,
        consistency:
          typeof score.consistency === "number"
            ? score.consistency
            : DEFAULT_SCORE.consistency,
        accessibility:
          typeof score.accessibility === "number"
            ? score.accessibility
            : DEFAULT_SCORE.accessibility
      }
    }
  };
};

export const validateZenoTokenConfig = (candidate: unknown) => {
  const normalized = normalizeZenoTheme(candidate);
  const issues = [...normalized.validation.issues];

  if (!normalized.metadata.name.trim()) {
    issues.push("metadata.name is required");
  }

  if (!normalized.tokens.id.trim()) {
    issues.push("tokens.id is required");
  }

  if (!normalized.tokens.color["bg.surface"]) {
    issues.push("tokens.color['bg.surface'] is required");
  }

  if (!normalized.tokens.color["text.primary"]) {
    issues.push("tokens.color['text.primary'] is required");
  }

  const valid = issues.length === 0;

  return {
    valid,
    issues,
    theme: {
      ...normalized,
      validation: {
        valid,
        issues,
        score: normalized.validation.score
      }
    }
  };
};

export const resolveHostedThemeUrl = (source: ZenoHostedThemeSource) => {
  const baseUrl = source.baseUrl.replace(/\/+$/, "");
  const environment = source.environment ?? "production";
  return `${baseUrl}/api/themes/${source.projectId}/${environment}.json`;
};

export const getZenoStorageKey = (
  source: ZenoThemeSource | undefined,
  override?: string
) => {
  if (override) {
    return override;
  }

  if (!source || source.type === "static") {
    return "zeno-theme:default";
  }

  return `zeno-theme:${source.baseUrl}:${source.projectId}:${source.environment ?? "production"}`;
};

const toCssVariableEntries = (theme: ZenoTokenConfig) => {
  const entries: Array<[string, string]> = [];
  const groups = ["color", "radius", "spacing", "type", "size", "shadow", "motion"] as const;

  for (const group of groups) {
    for (const [key, value] of Object.entries(theme.tokens[group])) {
      entries.push([`--zeno-${group}-${key.replace(/\./g, "-")}`, value]);
    }
  }

  entries.push(["--zeno-blur-glass", theme.tokens.blur.glass]);
  entries.push(["--zeno-opacity-glass", theme.tokens.opacity.glass]);
  entries.push(["--zeno-opacity-disabled", theme.tokens.opacity.disabled]);

  return entries;
};

export const generateRuntimeThemeCss = (theme: ZenoTokenConfig) => {
  const normalized = normalizeZenoTheme(theme);
  const body = toCssVariableEntries(normalized)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");

  return `:root[data-zeno-theme="active"] { ${body} }`;
};

export const applyZenoThemeToDocument = (
  theme: ZenoTokenConfig,
  target: HTMLElement = document.documentElement
) => {
  const normalized = normalizeZenoTheme(theme);
  const entries = toCssVariableEntries(normalized);

  target.dataset.zenoTheme = "active";
  target.dataset.zenoThemeId = normalized.tokens.id;

  if (normalized.publishedVersion) {
    target.dataset.zenoThemeVersion = normalized.publishedVersion;
  }

  target.style.colorScheme =
    normalized.tokens.knobs.mode === "dark" ? "dark" : "light";

  for (const [name, value] of entries) {
    target.style.setProperty(name, value);
  }
};

const buildThemeApplicationScript = (themeExpression: string) => {
  return `(function(){try{var theme=${themeExpression};if(!theme||!theme.tokens){return;}var root=document.documentElement;var groups=["color","radius","spacing","type","size","shadow","motion"];root.dataset.zenoTheme="active";root.dataset.zenoThemeId=theme.tokens.id||"zeno";if(theme.publishedVersion){root.dataset.zenoThemeVersion=theme.publishedVersion;}for(var i=0;i<groups.length;i+=1){var group=groups[i];var record=theme.tokens[group]||{};for(var key in record){if(Object.prototype.hasOwnProperty.call(record,key)){root.style.setProperty("--zeno-"+group+"-"+key.replace(/\\./g,"-"),String(record[key]));}}}root.style.setProperty("--zeno-blur-glass",String((theme.tokens.blur||{}).glass||"0px"));root.style.setProperty("--zeno-opacity-glass",String((theme.tokens.opacity||{}).glass||"1"));root.style.setProperty("--zeno-opacity-disabled",String((theme.tokens.opacity||{}).disabled||"0.5"));root.style.colorScheme=theme.tokens.knobs&&theme.tokens.knobs.mode==="dark"?"dark":"light";}catch(_error){}})();`;
};

export const createZenoThemeScript = (
  options: CreateZenoThemeScriptOptions = {}
) => {
  const fallbackTheme = normalizeZenoTheme(options.fallbackTheme ?? defaultZenoTheme);
  const source =
    options.source ??
    ({
      type: "static",
      theme: fallbackTheme
    } satisfies ZenoThemeSource);

  if (source.type === "static") {
    return buildThemeApplicationScript(JSON.stringify(normalizeZenoTheme(source.theme)));
  }

  const storageKey = JSON.stringify(getZenoStorageKey(source, options.storageKey));

  return `(function(){try{var raw=window.localStorage.getItem(${storageKey});if(!raw){return;}var theme=JSON.parse(raw);${buildThemeApplicationScript("theme").replace(/^\(function\(\)\{try\{/, "").replace(/\}\catch\(_error\)\{\}\}\)\(\);$/, "")}}catch(_error){}})();`;
};

