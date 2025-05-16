import { View, Text, Platform, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import styles from "../../assets/styles/login.style";
import { Ionicons } from '@expo/vector-icons';
import CustomAlert from '../../components/customAlert.js';
import COLORS from '../../constans/colors';
import { TextInput } from 'react-native';
import { useState } from 'react';
import {  useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {user, isLoading, register} = useAuthStore();    

    const [alertVisible, setAlertVisible] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [alertTitle, setAlertTitle] = useState('');

    const router = useRouter();



     const handleSignUp = async () => {
  const result = await register(userName, email, password);
  if (!result.success) {
    setAlertTitle("Error");
    setAlertMessage(result.error);
    setAlertVisible(true);
  }
};

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS ==="ios"? "padding":"height"}>

        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text  style={styles.title} >BookWorm 🐢</Text>
                     <Text  style={styles.subtitle} >Share your favourite reads</Text>
                </View>
                <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Username</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons
                         name='person-outline'
                        size={20}
                       color={COLORS.primary}
                       style={styles.inputIcon}/>

                      <TextInput
                      style={styles.input}
                    placeholder='Jhondoe'
                    placeholderTextColor={COLORS.placeholderText}
                    value={userName}
                    onChangeText={setUserName}
                    autoCapitalize='none'/>
                      </View>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons
                         name='mail-outline'
                        size={20}
                       color={COLORS.primary}
                       style={styles.inputIcon}/>

                      <TextInput
                      style={styles.input}
                    placeholder='jhondoe@gmail.com'
                    placeholderTextColor={COLORS.placeholderText}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'/>
                      </View>
                </View>  

                 <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}> 
                    <Ionicons 
                    name='lock-closed-outline'
                     size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}/>

                    <TextInput 
                    style={styles.input}
                    placeholder='Enter your password'
                    placeholderTextColor={COLORS.placeholderText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}/>

                    <TouchableOpacity
                    onPress={()=> setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons
                        
                        name={showPassword ? "eye-outline" : "eye-off-outline"}  size={20}
                       color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>
            </View>

             <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                {
                    isLoading ?(
                        <ActivityIndicator color={"#fff"}/>
                    ):(
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )
                }
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account ?</Text>

                <TouchableOpacity onPress={()=> router.back()}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
                </View>
            </View>
        </View>
        <CustomAlert
  visible={alertVisible}
  title={alertTitle}
  message={alertMessage}
  buttons={[
    {
      text: 'OK',
      onPress: () => setAlertVisible(false),
    },
  ]}
/>
    </KeyboardAvoidingView>
  )
}