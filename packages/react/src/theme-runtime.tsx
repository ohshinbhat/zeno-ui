import * as React from "react";
import { generateRuntimeThemeCss } from "./theme-css.js";
import {
  baseTokens,
  createZenoTokenConfig,
  readZenoTokenConfig,
  type ZenoAssetToken,
  type ZenoTokenConfig,
  type ZenoTokenConfigInput
} from "./tokens.js";

export type ZenoThemeSource =
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

export type ZenoThemeStatus = "fallback" | "loading" | "ready" | "error";

export type ZenoThemeLoadResult = {
  config: ZenoTokenConfig;
  source: "inline" | "remote";
};

export type ZenoThemeContextValue = {
  config: ZenoTokenConfig;
  status: ZenoThemeStatus;
  error: string | null;
  version: string | null;
  assets: Record<string, ZenoAssetToken>;
  reload: () => Promise<void>;
};

export type ZenoThemeProviderProps = {
  children: React.ReactNode;
  source: ZenoThemeSource;
  fallbackConfig?: ZenoTokenConfig | ZenoTokenConfigInput;
  className?: string;
  scopeClassName?: string;
  storageKey?: string;
  disableCache?: boolean;
  styleId?: string;
};

const ThemeContext = React.createContext<ZenoThemeContextValue | null>(null);
const defaultScopeClassName = "zeno-theme";

export const defaultZenoThemeConfig = createZenoTokenConfig({
  metadata: {
    name: "Zeno Default",
    projectId: "local",
    environment: "fallback"
  },
  tokens: baseTokens
});

function joinClassNames(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function normalizeConfig(config: ZenoTokenConfig | ZenoTokenConfigInput): ZenoTokenConfig {
  return readZenoTokenConfig(config).config;
}

function sourceToUrl(source: Extract<ZenoThemeSource, { type: "url" | "zeno" }>): string {
  if (source.type === "url") return source.url;

  const baseUrl = source.baseUrl.replace(/\/+$/g, "");
  const environment = encodeURIComponent(source.environment ?? "production");
  return `${baseUrl}/api/themes/${encodeURIComponent(source.projectId)}/${environment}.json`;
}

function sourceToCssUrl(source: Exclude<ZenoThemeSource, { type: "inline" }>): string {
  if (source.type === "url") {
    return source.url.endsWith(".json") ? source.url.slice(0, -5) + ".css" : "";
  }

  const baseUrl = source.baseUrl.replace(/\/+$/g, "");
  const environment = encodeURIComponent(source.environment ?? "production");
  return `${baseUrl}/api/themes/${encodeURIComponent(source.projectId)}/${environment}.css`;
}

function sourceCacheKey(source: ZenoThemeSource): string {
  if (source.type === "inline") return "zeno-ui-theme:inline";
  return `zeno-ui-theme:${sourceToUrl(source)}`;
}

function readCachedConfig(key: string): ZenoTokenConfig | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const result = readZenoTokenConfig(JSON.parse(raw) as unknown);
    return result.valid ? result.config : null;
  } catch {
    return null;
  }
}

function writeCachedConfig(key: string, config: ZenoTokenConfig): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(config));
  } catch {
    // Cache failures should never block a valid runtime theme.
  }
}

export async function loadZenoTheme(source: ZenoThemeSource): Promise<ZenoThemeLoadResult> {
  if (source.type === "inline") {
    const result = readZenoTokenConfig(source.config);
    if (!result.valid) throw new Error(result.issues.join(" ") || "Inline token config is invalid.");
    return { config: result.config, source: "inline" };
  }

  const response = await fetch(sourceToUrl(source), {
    cache: "no-store",
    ...(source.requestInit ?? {})
  });

  if (!response.ok) throw new Error(`Theme request failed with ${response.status}.`);

  const result = readZenoTokenConfig(await response.json() as unknown);
  if (!result.valid) throw new Error(result.issues.join(" ") || "Remote token config is invalid.");

  return { config: result.config, source: "remote" };
}

export function applyZenoTheme(
  config: ZenoTokenConfig | ZenoTokenConfigInput,
  {
    scope = `.${defaultScopeClassName}`,
    styleId = "zeno-theme-runtime"
  }: {
    scope?: string;
    styleId?: string;
  } = {}
): void {
  if (typeof document === "undefined") return;

  const normalized = normalizeConfig(config);
  const style = document.getElementById(styleId) ?? document.createElement("style");
  style.id = styleId;
  style.textContent = generateRuntimeThemeCss(normalized.tokens, scope);

  if (!style.parentElement) document.head.appendChild(style);
}

export function createZenoThemeScript({
  source,
  fallbackConfig = defaultZenoThemeConfig,
  scope = `.${defaultScopeClassName}`,
  styleId = "zeno-theme-runtime"
}: {
  source?: Exclude<ZenoThemeSource, { type: "inline" }>;
  fallbackConfig?: ZenoTokenConfig | ZenoTokenConfigInput;
  scope?: string;
  styleId?: string;
} = {}): string {
  const fallback = normalizeConfig(fallbackConfig);
  const fallbackCss = generateRuntimeThemeCss(fallback.tokens, scope);
  const remoteUrl = source ? sourceToCssUrl(source) : "";

  return `
(function () {
  var styleId = ${JSON.stringify(styleId)};
  var fallbackCss = ${JSON.stringify(fallbackCss)};
  var remoteUrl = ${JSON.stringify(remoteUrl)};
  var style = document.getElementById(styleId) || document.createElement("style");
  style.id = styleId;
  style.textContent = fallbackCss;
  if (!style.parentElement) document.head.appendChild(style);
  if (!remoteUrl) return;
  fetch(remoteUrl, { cache: "no-store" })
    .then(function (response) { return response.ok ? response.text() : ""; })
    .then(function (css) { if (css) style.textContent = css; })
    .catch(function () {});
})();
`.trim();
}

export function ZenoThemeProvider({
  children,
  source,
  fallbackConfig = defaultZenoThemeConfig,
  className,
  scopeClassName = defaultScopeClassName,
  storageKey,
  disableCache = false,
  styleId = "zeno-theme-runtime"
}: ZenoThemeProviderProps): React.ReactElement {
  const fallback = React.useMemo(() => normalizeConfig(fallbackConfig), [fallbackConfig]);
  const cacheKey = React.useMemo(() => storageKey ?? sourceCacheKey(source), [source, storageKey]);
  const [config, setConfig] = React.useState<ZenoTokenConfig>(fallback);
  const [status, setStatus] = React.useState<ZenoThemeStatus>("fallback");
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const result = await loadZenoTheme(source);
      setConfig(result.config);
      setStatus("ready");
      if (!disableCache) writeCachedConfig(cacheKey, result.config);
    } catch (themeError) {
      const cached = disableCache ? null : readCachedConfig(cacheKey);
      const message = themeError instanceof Error ? themeError.message : "Theme request failed.";
      setError(message);

      if (cached) {
        setConfig(cached);
        setStatus("ready");
        return;
      }

      setConfig(fallback);
      setStatus("error");
    }
  }, [cacheKey, disableCache, fallback, source]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const css = React.useMemo(() => generateRuntimeThemeCss(config.tokens, `.${scopeClassName}`), [config.tokens, scopeClassName]);
  const context = React.useMemo<ZenoThemeContextValue>(() => ({
    config,
    status,
    error,
    version: config.publishedVersion ?? null,
    assets: config.assets,
    reload: load
  }), [config, error, load, status]);

  return (
    <ThemeContext.Provider value={context}>
      <style id={styleId}>{css}</style>
      <div className={joinClassNames(scopeClassName, className)} data-zeno-theme-status={status}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useZenoTheme(): ZenoThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useZenoTheme must be used inside ZenoThemeProvider.");
  return context;
}

export function useZenoAsset(key: string): ZenoAssetToken | null {
  return useZenoTheme().assets[key] ?? null;
}
