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
    style?: StyleProp<ViewStyle>;
    testID?: string;
  }

  export class View extends React.Component<ViewProps> {}

  export interface TextProps extends React.PropsWithChildren<object> {
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
  }

  export class Text extends React.Component<TextProps> {}

  export interface PressableStateCallbackType {
    pressed: boolean;
    hovered?: boolean;
    focused?: boolean;
  }

  export interface PressableProps extends React.PropsWithChildren<object> {
    style?:
      | StyleProp<ViewStyle>
      | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
    onPress?: () => void;
    disabled?: boolean;
  }

  export class Pressable extends React.Component<PressableProps> {}

  export interface TextInputProps {
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
  }

  export class TextInput extends React.Component<TextInputProps> {}
}
