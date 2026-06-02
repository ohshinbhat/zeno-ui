import {
  baseTokens,
  bestTextColor,
  defaultKnobs,
  mix,
  themePresets,
  validateTheme,
  type DesignTokens,
  type ThemeKnobs
} from "@zeno-ui/tokens";

export type ThemeInput = Partial<ThemeKnobs> & {
  prompt?: string;
  seed?: string;
  name?: string;
};

export type PromptTags = {
  trend?: ThemeKnobs["trend"];
  weather?: ThemeKnobs["weather"];
  density?: ThemeKnobs["density"];
  type?: ThemeKnobs["type"];
  elevation?: ThemeKnobs["elevation"];
  border?: ThemeKnobs["border"];
  motion?: ThemeKnobs["motion"];
  texture?: ThemeKnobs["texture"];
  contrast?: ThemeKnobs["contrast"];
  mode?: ThemeKnobs["mode"];
  mood?: ThemeKnobs["mood"];
  industry?: "saas" | "fintech" | "commerce" | "gaming" | "health" | "creator";
};

export type GeneratedTheme = {
  id: string;
  name: string;
  input: ThemeInput;
  tags: PromptTags;
  tokens: DesignTokens;
  score: ReturnType<typeof validateTheme>["score"];
  issues: string[];
};

const dictionary: Array<[RegExp, PromptTags]> = [
  [/glass|glassmorphism|frosted/i, { trend: "glassmorphism", texture: "glass", elevation: "glass", border: "subtle" }],
  [/bento|grid/i, { trend: "bento", texture: "bento", density: "compact" }],
  [/minimal|clean|simple/i, { trend: "minimal", texture: "clean" }],
  [/brutal|brutalist|raw/i, { trend: "brutalist", border: "expressive", mood: "brutal" }],
  [/editorial|magazine|fashion/i, { trend: "editorial", type: "editorial" }],
  [/clay|soft|rounded/i, { trend: "clay", texture: "clean", elevation: "floating" }],
  [/immersive|3d|webgl|spatial/i, { texture: "glow", elevation: "floating", motion: "energetic", mode: "dark" }],
  [/story|storytelling|cinematic/i, { trend: "editorial", type: "editorial", density: "spacious", motion: "smooth" }],
  [/data|visualization|command center|analytics/i, { trend: "bento", density: "compact", type: "technical" }],
  [/social|timeline/i, { trend: "minimal", density: "compact", type: "technical" }],
  [/rain|rainy|drizzle/i, { weather: "rain", mood: "rainy", mode: "dark", motion: "smooth" }],
  [/snow|icy|winter/i, { weather: "snow", mood: "cold" }],
  [/fog|foggy|mist|haze/i, { weather: "fog", mood: "foggy", texture: "glass" }],
  [/storm|thunder/i, { weather: "storm", mode: "dark", mood: "cold" }],
  [/gold|sunset|golden/i, { weather: "golden-hour", mood: "warm" }],
  [/paper|archive|notebook|vintage/i, { trend: "editorial", texture: "grain", mood: "warm", motion: "minimal" }],
  [/forest|grove|moss|garden/i, { trend: "clay", mood: "clear", type: "calm", motion: "minimal" }],
  [/polar|nord|frost|winter/i, { weather: "snow", mood: "cold", type: "technical" }],
  [/night|dark/i, { weather: "night", mode: "dark" }],
  [/neon|cyber|arcade/i, { mood: "neon", texture: "glow", mode: "dark", motion: "energetic" }],
  [/luxury|premium|boutique/i, { mood: "luxury", type: "editorial", motion: "minimal" }],
  [/retro|pixel|pop/i, { trend: "brutalist", border: "expressive", type: "playful", motion: "playful" }],
  [/mono|monochrome|graphite/i, { trend: "minimal", border: "crisp", contrast: "high", motion: "minimal" }],
  [/terminal|ide|workbench|console/i, { trend: "minimal", density: "compact", type: "technical", mode: "dark" }],
  [/coffee|espresso|caffeine/i, { weather: "night", mood: "warm", texture: "grain", mode: "dark" }],
  [/floral|bloom|flora/i, { trend: "editorial", mood: "neon", texture: "glow", mode: "dark" }],
  [/lemon|citrus/i, { trend: "clay", mood: "warm", type: "playful", motion: "playful" }],
  [/silk|pearl/i, { trend: "minimal", texture: "clean", elevation: "floating", motion: "smooth" }],
  [/abyss|deep/i, { trend: "minimal", density: "compact", type: "technical", mode: "dark", contrast: "high" }],
  [/enterprise|ops|admin/i, { trend: "minimal", density: "compact", type: "technical", motion: "minimal" }],
  [/ai|agent|copilot/i, { trend: "bento", texture: "glow", type: "technical" }],
  [/compact|dense/i, { density: "compact" }],
  [/spacious|airy|large/i, { density: "spacious" }],
  [/playful|fun/i, { type: "playful", motion: "playful" }],
  [/calm|wellness|meditation/i, { type: "calm", motion: "minimal", industry: "health" }],
  [/technical|developer|devtools/i, { type: "technical" }],
  [/aaa|accessible|high contrast/i, { contrast: "AAA" }],
  [/high contrast/i, { contrast: "high" }],
  [/fintech|finance|bank/i, { industry: "fintech" }],
  [/saas|crm|analytics/i, { industry: "saas" }],
  [/ecommerce|commerce|shop/i, { industry: "commerce" }],
  [/gaming|game/i, { industry: "gaming" }],
  [/creator|portfolio/i, { industry: "creator" }]
];

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function titleCase(value: string): string {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

export function parsePrompt(prompt = ""): PromptTags {
  return dictionary.reduce<PromptTags>((tags, [pattern, patch]) => {
    if (!pattern.test(prompt)) return tags;
    return { ...tags, ...patch };
  }, {});
}

function paletteFor(knobs: ThemeKnobs): Pick<DesignTokens, "color">["color"] {
  const dark = knobs.mode === "dark" || knobs.weather === "night" || knobs.mood === "neon";
  const brand = knobs.brand;
  const accent = knobs.accent;
  const backgroundBase = dark ? "#070a12" : "#f8fafc";
  const warmBase = dark ? "#14100b" : "#fff8ed";
  const coldBase = dark ? "#07111f" : "#f4f9ff";
  const brutalBase = dark ? "#0a0a0a" : "#fffefa";

  const background = knobs.mood === "warm" || knobs.mood === "luxury"
    ? warmBase
    : knobs.mood === "cold" || knobs.weather === "rain" || knobs.weather === "snow"
      ? coldBase
      : knobs.mood === "brutal"
        ? brutalBase
        : backgroundBase;

  const surface = dark ? mix(background, "#ffffff", knobs.texture === "glass" ? 0.12 : 0.08) : "#ffffff";
  const surfaceRaised = dark ? mix(background, "#ffffff", 0.16) : mix(background, brand, knobs.texture === "bento" ? 0.05 : 0.025);
  const text = dark ? "#f8fafc" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const border = dark ? mix(background, "#ffffff", 0.22) : mix(background, "#0f172a", knobs.border === "crisp" ? 0.18 : 0.12);

  return {
    background,
    surface,
    surfaceRaised,
    surfaceGlass: dark ? "rgb(15 23 42 / 0.58)" : "rgb(255 255 255 / 0.68)",
    text,
    textMuted,
    border,
    brand,
    brandContrast: bestTextColor(brand),
    accent,
    accentContrast: bestTextColor(accent),
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626"
  };
}

function applyKnobTokens(knobs: ThemeKnobs, seed: string, name: string): DesignTokens {
  const sharp = knobs.trend === "brutalist" || knobs.mood === "brutal";
  const rounded = knobs.trend === "clay" || knobs.texture === "bento";
  const glass = knobs.texture === "glass" || knobs.elevation === "glass";
  const motionNone = knobs.motion === "none";

  return {
    ...baseTokens,
    name,
    id: slugify(`${name}-${seed}`).slice(0, 80),
    seed,
    knobs,
    color: paletteFor(knobs),
    radius: {
      control: sharp ? "0.25rem" : rounded ? "1rem" : "0.75rem",
      card: sharp ? "0.375rem" : rounded ? "1.25rem" : "1rem",
      pill: "999px"
    },
    shadow: {
      elevated: knobs.elevation === "flat" ? "none" : glass ? "0 18px 60px rgb(2 6 23 / 0.22)" : "0 12px 32px rgb(15 23 42 / 0.12)",
      floating: knobs.elevation === "flat" ? "none" : "0 24px 70px rgb(15 23 42 / 0.22)",
      focus: `0 0 0 3px ${knobs.brand}44`,
      glow: knobs.texture === "glow" ? `0 0 38px ${knobs.accent}8a` : `0 0 32px ${knobs.accent}42`
    },
    motion: {
      durationFast: motionNone ? "1ms" : knobs.motion === "energetic" ? "90ms" : "130ms",
      durationNormal: motionNone ? "1ms" : knobs.motion === "minimal" ? "160ms" : knobs.motion === "energetic" ? "180ms" : "240ms",
      durationSlow: motionNone ? "1ms" : knobs.motion === "playful" ? "520ms" : "420ms",
      easeStandard: "cubic-bezier(.2,0,0,1)",
      easeEnter: knobs.motion === "playful" ? "cubic-bezier(.34,1.56,.64,1)" : "cubic-bezier(.16,1,.3,1)",
      easeExit: "cubic-bezier(.7,0,.84,0)",
      scaleEnter: knobs.motion === "playful" ? ".94" : ".98",
      scalePress: knobs.motion === "none" ? "1" : knobs.motion === "energetic" ? ".94" : ".97",
      opacityEnter: motionNone ? "1" : "0",
      opacityDisabled: ".55",
      stagger: knobs.motion === "playful" ? "70ms" : "40ms"
    },
    blur: {
      glass: glass ? "22px" : "0px"
    },
    opacity: {
      glass: glass ? ".72" : "1",
      disabled: ".55"
    }
  };
}

export function generateTheme(input: ThemeInput = {}): GeneratedTheme {
  const preset = input.prompt
    ? Object.values(themePresets).find((candidate) => input.prompt && candidate.prompt.includes(input.prompt.toLowerCase()))
    : undefined;
  const promptTags = parsePrompt(input.prompt ?? preset?.prompt ?? "");
  const seed = input.seed ?? input.prompt ?? "clear-minimal";
  const hash = hashSeed(seed);
  const fallbackBrand = ["#2563eb", "#7c3aed", "#0891b2", "#db2777", "#059669"][hash % 5] ?? defaultKnobs.brand;
  const fallbackAccent = ["#14b8a6", "#f59e0b", "#22c55e", "#06b6d4", "#f43f5e"][hash % 5] ?? defaultKnobs.accent;
  const knobs: ThemeKnobs = {
    ...defaultKnobs,
    ...preset,
    ...promptTags,
    brand: input.brand ?? preset?.brand ?? fallbackBrand,
    accent: input.accent ?? preset?.accent ?? fallbackAccent,
    trend: input.trend ?? promptTags.trend ?? preset?.trend ?? defaultKnobs.trend,
    weather: input.weather ?? promptTags.weather ?? preset?.weather ?? defaultKnobs.weather,
    density: input.density ?? promptTags.density ?? preset?.density ?? defaultKnobs.density,
    type: input.type ?? promptTags.type ?? preset?.type ?? defaultKnobs.type,
    elevation: input.elevation ?? promptTags.elevation ?? preset?.elevation ?? defaultKnobs.elevation,
    border: input.border ?? promptTags.border ?? preset?.border ?? defaultKnobs.border,
    motion: input.motion ?? promptTags.motion ?? preset?.motion ?? defaultKnobs.motion,
    texture: input.texture ?? promptTags.texture ?? preset?.texture ?? defaultKnobs.texture,
    contrast: input.contrast ?? promptTags.contrast ?? preset?.contrast ?? defaultKnobs.contrast,
    mode: input.mode ?? promptTags.mode ?? preset?.mode ?? defaultKnobs.mode,
    mood: input.mood ?? promptTags.mood ?? preset?.mood ?? defaultKnobs.mood
  };
  const name = input.name ?? preset?.name ?? titleCase([knobs.mood, knobs.trend].join(" "));
  const tokens = applyKnobTokens(knobs, seed, name);
  const validation = validateTheme(tokens);

  return {
    id: tokens.id,
    name,
    input,
    tags: promptTags,
    tokens,
    score: validation.score,
    issues: validation.issues
  };
}
