import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AppTheme } from '../constants/Theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={AppTheme}>
      <StatusBar style="light" backgroundColor="#1B5E20" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
