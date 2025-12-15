import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* The Tab Navigator */}
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      
      {/* The WebView Screen (Modal style) */}
      <Stack.Screen 
        name="article" 
        options={{ 
          title: 'Article View',
          presentation: 'modal',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}