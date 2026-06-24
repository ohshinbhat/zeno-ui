export type ZenoThemeKnobs = {
  brand: string;
  accent: string;
  trend: string;
  weather: string;
  density: string;
  type: string;
  elevation: string;
  border: string;
  motion: string;
  texture: string;
  contrast: string;
  mode: string;
  mood: string;
};

export type ZenoValidationScore = {
  contrast: number;
  consistency: number;
  accessibility: number;
};

export type ZenoTokenConfig = {
  schemaVersion: "1.0.0";
  metadata: {
    name: string;
    projectId?: string;
    environment?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  tokens: {
    name: string;
    id: string;
    seed: string;
    knobs: ZenoThemeKnobs;
    color: Record<string, string>;
    radius: Record<string, string>;
    spacing: Record<string, string>;
    type: Record<string, string>;
    size: Record<string, string>;
    shadow: Record<string, string>;
    motion: Record<string, string>;
    blur: {
      glass: string;
    };
    opacity: {
      glass: string;
      disabled: string;
    };
  };
  assets: Record<
    string,
    {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
      hash?: string;
    }
  >;
  modes: Record<string, Partial<ZenoTokenConfig["tokens"]>>;
  publishedVersion?: string;
  validation: {
    valid: boolean;
    issues: string[];
    score: ZenoValidationScore;
  };
};

export type ZenoHostedThemeSource = {
  type: "zeno";
  projectId: string;
  environment?: string;
  baseUrl: string;
};

export type ZenoStaticThemeSource = {
  type: "static";
  theme: ZenoTokenConfig;
};

export type ZenoThemeSource = ZenoHostedThemeSource | ZenoStaticThemeSource;

export type ZenoRuntimePolicy =
  | "network-first"
  | "cache-first"
  | "network-only"
  | "static-only";

export type ZenoThemeStatus =
  | "idle"
  | "loading"
  | "refreshing"
  | "ready"
  | "error";

export type ZenoThemeContextValue = {
  config: ZenoTokenConfig;
  status: ZenoThemeStatus;
  version?: string;
  error?: Error;
  assets: ZenoTokenConfig["assets"];
  source: ZenoThemeSource;
  reload: () => void;
};

export type CreateZenoThemeScriptOptions = {
  source?: ZenoThemeSource;
  fallbackTheme?: ZenoTokenConfig;
  storageKey?: string;
};

