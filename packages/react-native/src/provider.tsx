import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { ZenoRuntimePolicy, ZenoThemeContextValue, ZenoThemeSource, ZenoThemeStatus, ZenoTokenConfig } from "./types";
import { defaultZenoTheme, getZenoCacheKey, normalizeZenoTheme, resolveHostedThemeUrl, validateZenoTokenConfig } from "./theme";

type ZenoThemeProviderProps = {
  children: ReactNode;
  source?: ZenoThemeSource;
  runtimePolicy?: ZenoRuntimePolicy;
  fallbackTheme?: ZenoTokenConfig;
  cacheKey?: string;
};

type ThemeState = {
  config: ZenoTokenConfig;
  status: ZenoThemeStatus;
  error?: Error;
};

const defaultSource: ZenoThemeSource = {
  type: "static",
  theme: defaultZenoTheme
};

const defaultContextValue: ZenoThemeContextValue = {
  config: defaultZenoTheme,
  status: "ready",
  version: defaultZenoTheme.publishedVersion,
  assets: defaultZenoTheme.assets,
  source: defaultSource,
  reload: () => {}
};

const ZenoThemeContext = createContext<ZenoThemeContextValue>(defaultContextValue);
const runtimeCache = new Map<string, ZenoTokenConfig>();

const getInitialState = (
  source: ZenoThemeSource,
  fallbackTheme: ZenoTokenConfig,
  cacheKey: string,
  runtimePolicy: ZenoRuntimePolicy
): ThemeState => {
  if (source.type === "static") {
    return {
      config: normalizeZenoTheme(source.theme),
      status: "ready"
    };
  }

  if (runtimePolicy !== "network-only") {
    const cached = runtimeCache.get(cacheKey);
    if (cached) {
      return {
        config: cached,
        status: runtimePolicy === "cache-first" ? "refreshing" : "loading"
      };
    }
  }

  return {
    config: fallbackTheme,
    status: runtimePolicy === "static-only" ? "ready" : "loading"
  };
};

export function ZenoThemeProvider({
  children,
  source,
  runtimePolicy = "network-first",
  fallbackTheme,
  cacheKey
}: ZenoThemeProviderProps) {
  const resolvedFallback = normalizeZenoTheme(fallbackTheme ?? defaultZenoTheme);
  const resolvedSource =
    source ??
    ({
      type: "static",
      theme: resolvedFallback
    } satisfies ZenoThemeSource);
  const resolvedCacheKey = getZenoCacheKey(resolvedSource, cacheKey);
  const sourceSignature = JSON.stringify(resolvedSource);
  const fallbackSignature = JSON.stringify(resolvedFallback);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [state, setState] = useState<ThemeState>(() =>
    getInitialState(resolvedSource, resolvedFallback, resolvedCacheKey, runtimePolicy)
  );

  useEffect(() => {
    let isDisposed = false;

    const sync = async () => {
      if (resolvedSource.type === "static") {
        if (!isDisposed) {
          setState({
            config: normalizeZenoTheme(resolvedSource.theme),
            status: "ready"
          });
        }
        return;
      }

      const cached =
        runtimePolicy === "network-only" ? null : runtimeCache.get(resolvedCacheKey);

      if (cached && !isDisposed) {
        setState({
          config: cached,
          status: runtimePolicy === "cache-first" ? "refreshing" : "loading"
        });
      } else if (!isDisposed) {
        setState({
          config: resolvedFallback,
          status: runtimePolicy === "static-only" ? "ready" : "loading"
        });
      }

      if (runtimePolicy === "static-only") {
        return;
      }

      try {
        const response = await fetch(resolveHostedThemeUrl(resolvedSource), {
          headers: {
            accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to load Zeno theme (${response.status})`);
        }

        const payload = await response.json();
        const validated = validateZenoTokenConfig(payload);

        if (!validated.valid) {
          throw new Error(validated.issues.join(", "));
        }

        runtimeCache.set(resolvedCacheKey, validated.theme);

        if (!isDisposed) {
          setState({
            config: validated.theme,
            status: "ready"
          });
        }
      } catch (error) {
        const resolvedError =
          error instanceof Error ? error : new Error("Failed to load Zeno theme");

        if (isDisposed) {
          return;
        }

        if (cached) {
          setState({
            config: cached,
            status: "ready",
            error: resolvedError
          });
          return;
        }

        setState({
          config: resolvedFallback,
          status: "error",
          error: resolvedError
        });
      }
    };

    void sync();

    return () => {
      isDisposed = true;
    };
  }, [fallbackSignature, reloadNonce, resolvedCacheKey, runtimePolicy, sourceSignature]);

  const contextValue: ZenoThemeContextValue = {
    config: state.config,
    status: state.status,
    version: state.config.publishedVersion,
    assets: state.config.assets,
    error: state.error,
    source: resolvedSource,
    reload: () => {
      setReloadNonce((value) => value + 1);
    }
  };

  return (
    <ZenoThemeContext.Provider value={contextValue}>
      {children}
    </ZenoThemeContext.Provider>
  );
}

export const ZenoProvider = ZenoThemeProvider;

export const useZenoTheme = () => useContext(ZenoThemeContext);
