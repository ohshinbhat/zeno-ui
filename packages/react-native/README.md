# @zeno-ui/react-native

React Native primitives for the Zeno UI component system.

```bash
npm install @zeno-ui/react-native react react-native
```

```tsx
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  ZenoNativeProvider
} from "@zeno-ui/react-native";

function App() {
  return (
    <ZenoNativeProvider
      source={{
        type: "zeno",
        projectId: "acme",
        environment: "production",
        baseUrl: "https://zeno-ui.example.com"
      }}
    >
      <Card>
        <Stack gap="$3">
          <Badge tone="success">Published</Badge>
          <Text size="title" weight="semibold">Theme settings</Text>
          <Input label="Project" placeholder="Acme dashboard" />
          <Textarea label="Brief" />
          <Select label="Density" value="cozy" placeholder="Choose density" />
          <Checkbox label="Validate contrast" defaultChecked />
          <Switch label="Publish theme" />
          <Button label="Save" />
        </Stack>
      </Card>
    </ZenoNativeProvider>
  );
}
```

## Components

- Layout and typography: `Stack`, `Text`
- Actions and display: `Button`, `Badge`, `Card`
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`

The native package consumes the same `ZenoTokenConfig` contract as web. Because React Native cannot apply CSS variables, `ZenoNativeProvider` converts the active token config into concrete color, spacing, radius, typography, and size values for the components.
