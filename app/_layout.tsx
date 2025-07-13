import { AuthContextProvider } from '@/providers/AuthContext';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#111827');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return (
    <AuthContextProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#111827',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
          }}
        >
          <StatusBar
            barStyle={'light-content'}
            backgroundColor='#111827'
            animated
            translucent
            showHideTransition={'fade'}
          />
          <Slot />
          <Toast />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthContextProvider>
  );
}
