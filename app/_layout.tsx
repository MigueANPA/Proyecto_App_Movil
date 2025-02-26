import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Evita que la pantalla de carga se oculte automáticamente antes de completar la carga de recursos.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && !user) {
      router.replace('/aunth/login');
    }
  }, [loaded, user]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="(deteccionGases)"
            options={{
              drawerLabel: 'Inicio',
              title: 'Inicio',
              drawerIcon: ({ color }) => <FontAwesome6 name="house" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="aunth/login"
            options={{
              drawerLabel: 'Inicio de Ceción',
              title: 'Inicio de Ceción',
              drawerIcon: ({ color }) => <FontAwesome6 name="sign-in-alt" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="aunth/profile"
            options={{
              drawerLabel: 'Perfil de Usario',
              title: 'Perfil de Usuario',
              drawerIcon: ({ color }) => <FontAwesome6 name="user" size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name="+not-found"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="index"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="login"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
