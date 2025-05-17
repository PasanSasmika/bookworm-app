import { Text, TouchableOpacity, View } from "react-native";
import {Image} from "expo-image"
import { Link } from "expo-router";
import { useAuthStore } from '../../Mobile/store/authStore';
import { useEffect } from "react";

export default function Index() {
  const { user, token, checkAuth, logout , login} = useAuthStore();

  useEffect(()=>{
    checkAuth();
    login();
  },[])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome</Text>
      <Text>{user?.userName}</Text>
      <Text>{token}</Text>
      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/(auth)">Login</Link>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Image/>
    </View>
  );
}
