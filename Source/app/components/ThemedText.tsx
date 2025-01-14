import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'body' | 'app';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color }, 
        type === 'app' ? styles.app : undefined, 
        type === 'title' ? styles.title : undefined,
        type === 'body' ? styles.body : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({ 
  app: {
    fontSize: 32,
    fontWeight: 'bold',  
    lineHeight: 32, 
    alignItems: 'center', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,  
    top: 100,
    alignItems: 'center',
    position: 'absolute',
  },
  body: {
    fontSize: 16,  
    fontWeight: 'normal',
    lineHeight: 24,
    textAlign: 'left',
    marginTop: 10, 
  }, 
});

export default ThemedText;
