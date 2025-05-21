import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore"
import { useEffect, useState } from "react";
import { useFonts} from "expo-font";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
 const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const segmant = useSegments();
  const { checkAuth, user, token} = useAuthStore();

  const [fontsLoaded] = useFonts({
      "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(()=>{
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded])

  useEffect(()=>{
    checkAuth(); 
    setIsMounted(true);
  },[])

  // handle the navigation based on auth state

   useEffect(() => {
    if (!isMounted || !fontsLoaded) return;
    
    const inAuthScreen = segmant[0] === "(auth)";
    const isSignIn = user && token;
    
    if (!isSignIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segmant, isMounted, fontsLoaded]);
 
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar style="dark" />
      </SafeScreen>
    </SafeAreaProvider>
  );
}