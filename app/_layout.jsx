import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen"
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react";
export default function RootLayout() {

  const router = useRouter();
  const segmant = useSegments();
  const { checkAuth, user, token} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[])

  // handle the navigation based on auth state

  useEffect(()=>{
   const inAuthScreeen = segmant[0] === "(auth)";
   const isSignIn = user && token;

   if (!isSignIn && !inAuthScreeen) router.replace("/(auth)");
   else if (isSignIn && inAuthScreeen) router.replace("/(tabs)");
  },[user,token,segmant])

  return <Stack  screenOptions={{ headerShown:false }}>
    <SafeAreaProvider>
      <SafeScreen>
    <Stack.Screen name="(tabs)"/>
     <Stack.Screen name="(auth)"/>
     </SafeScreen>
     <StatusBar style="dark"/>
     </SafeAreaProvider>
  </Stack>;
}
