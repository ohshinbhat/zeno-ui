# @zeno-ui/react

React primitives for the Zeno UI component system.

```bash
npm install @zeno-ui/react react react-dom
```

```tsx
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Separator,
  Stack,
  Switch,
  Text,
  Textarea
} from "@zeno-ui/react";
```

## Components

- Layout and typography: `Stack`, `Text`, `Separator`
- Actions and display: `Button`, `Badge`, `Card`
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`

The 10 shared primitives are mirrored by `@zeno-ui/react-native`: `Stack`, `Text`, `Button`, `Input`, `Card`, `Badge`, `Textarea`, `Select`, `Checkbox`, and `Switch`. `Separator` is available as an additional layout utility.

```tsx
function Example() {
  return (
    <Card>
      <Card.Header>
        <Stack gap="$2">
          <Badge tone="success">Published</Badge>
          <Text as="h2" size="title" weight="semibold">
            Theme settings
          </Text>
        </Stack>
      </Card.Header>

      <Card.Content>
        <Stack gap="$3">
          <Input label="Project" placeholder="Acme dashboard" />
          <Textarea label="Brief" resize="vertical" />
          <Select label="Density" defaultValue="cozy">
            <option value="compact">Compact</option>
            <option value="cozy">Cozy</option>
            <option value="spacious">Spacious</option>
          </Select>
          <Separator />
          <Checkbox label="Validate contrast" defaultChecked />
          <Switch label="Publish theme" />
        </Stack>
      </Card.Content>

      <Card.Footer>
        <Button>
          <Button.Text>Save</Button.Text>
        </Button>
      </Card.Footer>
    </Card>
  );
}
```
