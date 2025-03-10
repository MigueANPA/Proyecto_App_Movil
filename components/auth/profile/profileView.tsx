import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator, Text } from 'react-native-paper';
import { auth, sendPasswordResetEmail } from '@/lib/firebase';
import { signOut, updateProfile, onAuthStateChanged, User } from 'firebase/auth';

export default function ProfileView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingPasswordReset, setSendingPasswordReset] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setName(currentUser?.displayName || '');
      setEmail(currentUser?.email || '');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada correctamente");
    } catch (error: any) {
      Alert.alert(`Error al cerrar sesión: ${error.message}`);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    if (!name.trim()) {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }
    setSaving(true);
    try {
      await updateProfile(user, { displayName: name });
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const sendResetPasswordEmail = async () => {
    if (!user?.email) {
      Alert.alert("Error", "Debes iniciar sesión para restablecer la contraseña.");
      return;
    }
    setSendingPasswordReset(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetPasswordEmailSent(true);
    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
    } finally {
      setSendingPasswordReset(false);
    }
  };

  if (loading) {
    return <ActivityIndicator animating={true} style={styles.loading} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Perfil de Usuario</Text>

      <TextInput label="Correo Electrónico" value={email} disabled mode="outlined" style={styles.input} />
      <TextInput label="Nombre" value={name} onChangeText={setName} mode="outlined" style={styles.input} />

      <Button mode="contained" onPress={saveProfile} loading={saving} disabled={saving} style={styles.button}>
        {saving ? "Guardando..." : "Actualizar Perfil"}
      </Button>

      <Button mode="outlined" onPress={logout} style={styles.logoutButton}>
        Cerrar Sesión
      </Button>
      <Button mode="outlined" onPress={sendResetPasswordEmail} style={styles.resetButton}>
        {resetPasswordEmailSent ? "Correo enviado" : "Restablecer Contraseña"}
      </Button>

      {resetPasswordEmailSent && (
        <Text style={styles.successMessage}>Se ha enviado un correo electrónico de restablecimiento de contraseña.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ECF0F1",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#16A085",
    paddingVertical: 10,
    borderRadius: 25,
  },
  logoutButton: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    borderRadius: 25,
  },
  resetButton: {
    width: "100%",
    marginTop: 10,
    borderColor: "#3498DB",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 25,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  successMessage: {
    marginTop: 10,
    color: "green",
  },
});