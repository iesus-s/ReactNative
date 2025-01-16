import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'body' | 'app' | 'request' | 'nav';
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
        type === 'request' ? styles.request : undefined,
        type === 'nav' ? styles.nav : undefined,
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
  nav: {
    fontSize: 16,
    fontWeight: 'bold',  
    lineHeight: 16, 
    alignItems: 'center',
  },
  request: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,  
    top: 10,
    alignItems: 'center',  
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,  
    top: 10,
    alignItems: 'center', 
    paddingTop: 80,
    paddingBottom: 40, 
  },
  body: {
    fontSize: 16,  
    fontWeight: 'normal',
    lineHeight: 24, 
    marginTop: 10,   
  }, 
});

export default ThemedText;
