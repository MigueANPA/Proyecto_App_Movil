import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "@/lib/firebase";
import { router } from 'expo-router';

export const LoginView = () => {
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("¡Éxito!", "Inicio de sesión exitoso");
      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Monitorea la calidad del aire y gases</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#B0B0B0"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#B0B0B0"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});