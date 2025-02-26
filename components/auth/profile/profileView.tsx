import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator, Text } from 'react-native-paper';
import { auth, sendPasswordResetEmail } from '@/lib/firebase';
import { signOut, updateProfile, onAuthStateChanged, User, AuthError } from 'firebase/auth';

export default function ProfileView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingPasswordReset, setSendingPasswordReset] = useState(false); // Loading state for password reset
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
      let errorMessage = error.message;
      if (error.code === 'auth/requires-recent-login') {
          errorMessage = "Por favor, inicia sesión de nuevo para actualizar tu perfil.";
      }
      Alert.alert(`Error: ${errorMessage}`);
      console.error("Error updating profile:", error); // Log the error for debugging
    } finally {
      setSaving(false);
    }
  };

  const sendResetPasswordEmail = async () => {
    if (!user?.email) {
      Alert.alert("Error", "Debes iniciar sesión para restablecer la contraseña.");
      return;
    }
    setSendingPasswordReset(true); // Start loading state
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetPasswordEmailSent(true);
      setSendingPasswordReset(false); // End loading state
    } catch (error: any) {
      let errorMessage = error.message;
        if (error.code === 'auth/invalid-email') {
            errorMessage = 'Por favor, introduce una dirección de correo electrónico válida.';
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'No se encontró ningún usuario con esa dirección de correo electrónico.';
        }
      Alert.alert(`Error: ${errorMessage}`);
      setSendingPasswordReset(false); // End loading state even on error
      console.error("Error sending password reset email:", error); // Log for debugging
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

      <Button mode="outlined" onPress={logout} style={styles.button}>
        Cerrar Sesión
      </Button>
      <Button mode="outlined" onPress={sendResetPasswordEmail} style={styles.button}>
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
    backgroundColor: "#F4F4F4",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
  },
});
