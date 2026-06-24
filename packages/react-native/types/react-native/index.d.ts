declare module "react-native" {
  import * as React from "react";

  export type ViewStyle = Record<string, unknown>;
  export type TextStyle = Record<string, unknown>;
  export type ImageStyle = Record<string, unknown>;
  export type StyleProp<T> = T | Array<StyleProp<T>> | false | null | undefined;

  export type AccessibilityRole =
    | "button"
    | "checkbox"
    | "switch"
    | "text"
    | "none";

  export type GestureResponderEvent = {
    nativeEvent: Record<string, unknown>;
  };

  export type ViewProps = {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    nativeID?: string | undefined;
    testID?: string | undefined;
    accessibilityLabel?: string | undefined;
    accessibilityRole?: AccessibilityRole | undefined;
    accessibilityState?: Record<string, unknown> | undefined;
  };

  export type TextProps = {
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>;
    nativeID?: string | undefined;
    testID?: string | undefined;
    numberOfLines?: number | undefined;
    accessibilityLabel?: string | undefined;
    accessibilityRole?: AccessibilityRole | undefined;
  };

  export type PressableProps = ViewProps & {
    disabled?: boolean | undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
  };

  export type TextInputProps = Omit<TextProps, "children"> & {
    value?: string | undefined;
    defaultValue?: string | undefined;
    placeholder?: string | undefined;
    placeholderTextColor?: string | undefined;
    editable?: boolean | undefined;
    multiline?: boolean | undefined;
    numberOfLines?: number | undefined;
    secureTextEntry?: boolean | undefined;
    keyboardType?: string | undefined;
    autoCapitalize?: string | undefined;
    autoCorrect?: boolean | undefined;
    onChangeText?: ((text: string) => void) | undefined;
  };

  export type SwitchProps = ViewProps & {
    value?: boolean | undefined;
    disabled?: boolean | undefined;
    onValueChange?: ((value: boolean) => void) | undefined;
    trackColor?: {
      false?: string | undefined;
      true?: string | undefined;
    } | undefined;
    thumbColor?: string | undefined;
  };

  export const View: React.ComponentType<ViewProps>;
  export const Text: React.ComponentType<TextProps>;
  export const Pressable: React.ComponentType<PressableProps>;
  export const TextInput: React.ComponentType<TextInputProps>;
  export const Switch: React.ComponentType<SwitchProps>;
}
