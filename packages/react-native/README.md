# @zenoui/react-native

Zeno UI native primitives and hosted theme runtime.

## Install

```bash
npm install @zenoui/react-native
```

Zeno native primitives are styled with NativeWind. Install and configure NativeWind in your app, then include the package output in your Tailwind content scan:

```ts
// tailwind.config.ts
export default {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@zenoui/react-native/dist/**/*.{js,mjs}"
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
} from "@zenoui/react-native";

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

- npm: [@zenoui/react-native](https://www.npmjs.com/package/@zenoui/react-native)
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
import { ZenoThemeProvider } from "@zenoui/react-native";

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

## Styling

Components use NativeWind `className` utilities and Zeno runtime variables provided by `ZenoThemeProvider`. Use `className` for overrides, and use targeted props such as `labelClassName`, `helperClassName`, `textClassName`, `imageClassName`, or `thumbClassName` for styled sub-parts.
