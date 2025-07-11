import { AuthContextProvider } from '@/providers/AuthContext';
import { Stack } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
          }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='white'
        animated
        translucent
        showHideTransition={'fade'}
      />
    </AuthContextProvider>
  );
}
