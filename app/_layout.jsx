import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return <Stack  screenOptions={{ headerShown:false }}>
    <SafeAreaProvider>
      <SafeScreen>
    <Stack.Screen name="index"/>
     <Stack.Screen name="(auth)"/>
     </SafeScreen>
     <StatusBar style="dark"/>
     </SafeAreaProvider>
  </Stack>;
}
