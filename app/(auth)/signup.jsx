import { View, Text, Platform, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from "../../assets/styles/login.style";
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constans/colors';
import { TextInput } from 'react-native';
import { useState } from 'react';
import {  useRouter } from 'expo-router';

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
     const handleSignUp = ()=>{}

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
                    placeholder='Jhon Doe'
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
    </KeyboardAvoidingView>
  )
}