import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router'; 
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated'; 
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useColorScheme } from './hooks/useColorScheme';
import { ThemedView } from './components/ThemedView';  
import { ThemedText } from './components/ThemedText';  

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter(); // Initialize router
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        {/* Navigation Stack */}
        <ThemedView style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="screens" options={{ headerShown: false }} />
          </Stack>
        </ThemedView>

        {/* Bottom Navigation Bar */}
        <ThemedView style={styles.navBar}>
          <TouchableOpacity onPress={() => router.push('/screens/home')}>
            <ThemedText>Home</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/screens/game')}>
            <ThemedText>Game</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/screens/stats')}>
            <ThemedText>Stats</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/screens/options')}>
            <ThemedText>Options</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Status Bar */}
        <StatusBar style="auto" />
      </ThemedView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, 
    borderTopWidth: 1, 
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  }, 
});
