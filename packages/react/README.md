# @zenoui/react

Zeno UI web primitives and hosted theme runtime.

## Install

```bash
npm install @zenoui/react
```

Zeno web primitives are styled with Tailwind classes. Add the package output to your Tailwind content scan:

```ts
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@zenoui/react/dist/**/*.{js,mjs}"
  ]
};
```

## Quick Start

```tsx
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Select,
  Stack,
  Switch,
  Text,
  ZenoThemeProvider
} from "@zenoui/react";

export function App() {
  return (
    <ZenoThemeProvider>
      <Card>
        <Stack gap="md">
          <Avatar name="Ada Lovelace" />
          <Badge tone="brand">Live</Badge>
          <Text variant="title">Project settings</Text>
          <Select
            label="Environment"
            placeholder="Choose environment"
            options={[
              { label: "Production", value: "production" },
              { label: "Preview", value: "preview" }
            ]}
          />
          <Checkbox label="Enable runtime theme" defaultChecked />
          <Switch label="Publish changes" />
          <Button>Save</Button>
        </Stack>
      </Card>
    </ZenoThemeProvider>
  );
}
```

## Links

- npm: [@zenoui/react](https://www.npmjs.com/package/@zenoui/react)
- GitHub: [ohshinbhat/zeno-ui](https://github.com/ohshinbhat/zeno-ui)
- Issues: [github.com/ohshinbhat/zeno-ui/issues](https://github.com/ohshinbhat/zeno-ui/issues)

## Included primitives

- `Avatar`
- `Badge`
- `Stack`
- `Text`
- `Button`
- `Input`
- `Card`
- `Checkbox`
- `Select`
- `Switch`

## Runtime Theme Source

```tsx
import { createZenoThemeScript, ZenoThemeProvider } from "@zenoui/react";

const source = {
  type: "zeno",
  projectId: "your-project-id",
  environment: "production",
  baseUrl: "https://your-zeno-site.vercel.app"
} as const;

export function Root({ children }: { children: React.ReactNode }) {
  return <ZenoThemeProvider source={source}>{children}</ZenoThemeProvider>;
}
```

Use `createZenoThemeScript({ source })` in your app shell when you want the theme applied before hydration.

## Styling

Components use Tailwind utility classes and Zeno runtime CSS variables. Use `className` for overrides, and use targeted props such as `labelClassName`, `helperClassName`, `imageClassName`, or `thumbClassName` when a component has styled sub-parts.
