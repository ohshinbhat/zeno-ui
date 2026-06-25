declare module "react-native" {
  import * as React from "react";

  export type ColorValue = string;
  export type StyleProp<T> =
    | T
    | null
    | undefined
    | ReadonlyArray<StyleProp<T>>;

  export interface ViewStyle {
    [key: string]: string | number | undefined | { width: number; height: number };
  }

  export interface TextStyle extends ViewStyle {}

  export interface ViewProps extends React.PropsWithChildren<object> {
    className?: string;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
    accessibilityState?: Record<string, boolean | string | undefined>;
  }

  export class View extends React.Component<ViewProps> {}

  export interface TextProps extends React.PropsWithChildren<object> {
    className?: string;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }

  export class Text extends React.Component<TextProps> {}

  export interface PressableStateCallbackType {
    pressed: boolean;
    hovered?: boolean;
    focused?: boolean;
  }

  export interface PressableProps extends React.PropsWithChildren<object> {
    className?: string;
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
    onPress?: () => void;
    disabled?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityRole?: string;
    accessibilityState?: Record<string, boolean | string | undefined>;
  }

  export class Pressable extends React.Component<PressableProps> {}

  export interface TextInputProps {
    className?: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    placeholderTextColor?: ColorValue;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    editable?: boolean;
    autoCapitalize?: string;
    keyboardType?: string;
    multiline?: boolean;
    style?: StyleProp<TextStyle>;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityState?: Record<string, boolean | string | undefined>;
  }

  export class TextInput extends React.Component<TextInputProps> {}

  export interface ImageStyle extends ViewStyle {}

  export interface ImageProps {
    className?: string;
    source: { uri: string };
    style?: StyleProp<ImageStyle>;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    onError?: () => void;
    onLoad?: () => void;
  }

  export class Image extends React.Component<ImageProps> {}
}

declare module "nativewind" {
  import type { StyleProp, ViewStyle } from "react-native";

  export function vars(
    values: Record<string, string | number>
  ): StyleProp<ViewStyle>;
}
