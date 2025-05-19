import { View, Text, Alert, TouchableOpacity } from 'react-native'
import { useAuthStore } from '../store/authStore';
import styles from '../assets/styles/profile.style';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constans/colors';

export default function LogoutButton() {

     const { logout} = useAuthStore(); 

     const confirmation = ()=>{
            Alert.alert("Logout", "Are you sure you want to logout?", [
                { text: "Cancel", style: "cancel"},
                { text: "Logout", onPress: ()=> logout(), style: "destructive"},
            ]);
     };
    
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmation}>
    <Ionicons name='log-out-outline' size={20} color={COLORS.white}/>
    <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}