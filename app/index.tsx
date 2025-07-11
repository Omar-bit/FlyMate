import Button from '@/components/Button';
import Input from '@/components/Input';
import Tabs from '@/components/Tabs';
import useAuth from '@/providers/AuthContext';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
// Conditionally import Google Sign-In
let GoogleSignin: any = null;
let GoogleSigninButton: any = null;
let isSuccessResponse: any = null;
let statusCodes: any = null;
let isGoogleSignInAvailable = false;

try {
  const googleSignInModule = require('@react-native-google-signin/google-signin');
  GoogleSignin = googleSignInModule.GoogleSignin;
  GoogleSigninButton = googleSignInModule.GoogleSigninButton;
  isSuccessResponse = googleSignInModule.isSuccessResponse;
  statusCodes = googleSignInModule.statusCodes;
  isGoogleSignInAvailable = true;
} catch (error) {
  console.log('Google Sign-In not available in this environment');
}

export default function Index() {
  const router = useRouter();
  const authContext = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const auth = getAuth();

  async function authenticate() {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all fields',
      });
      return;
    }

    setIsAuthenticating(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      Toast.show({
        type: 'error',
        text1: 'Authentication Error',
        text2: error.message,
      });
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function googleSignin() {
    if (!isGoogleSignInAvailable) {
      Toast.show({
        type: 'error',
        text1: 'Google Sign-In Not Available',
        text2: 'Please create a development build to use Google Sign-In',
      });
      return;
    }

    setIsAuthenticating(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (isSuccessResponse(userInfo)) {
        const userCredentials = userInfo.data;
        // console.log(' user info:', userCredentials);
        const googleCredential = GoogleAuthProvider.credential(
          userCredentials.idToken
        );
        await signInWithCredential(auth, googleCredential);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show({
          type: 'info',
          text1: 'Sign in cancelled',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show({
          type: 'info',
          text1: 'Sign in in progress',
        });
      } else {
        console.error('Google Sign-In error:', error);
        Toast.show({
          type: 'error',
          text1: 'Google Sign-In Error',
          text2: error.message,
        });
      }
    } finally {
      setIsAuthenticating(false);
    }
  }

  useEffect(() => {
    if (authContext.user && !authContext.isLoading) {
      router.replace('/home');
    }
  }, [authContext.user, authContext.isLoading]);

  if (authContext.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center p-5 gap-5 bg-[#111827]'>
      <Image
        source={require('../assets/logo.png')}
        className='size-32 rounded-lg'
      />
      <Text className='font-extrabold mb-7 text-2xl text-white'>
        Welcome to FlyMate
      </Text>
      <Tabs
        tabs={[
          { id: 'signin', label: 'Sign In' },
          { id: 'signup', label: 'Sign Up' },
        ]}
        onTabChange={(tabId) => setIsLogin(tabId === 'signin')}
        defaultActiveTab='signin'
      />

      {/* {!isLogin&& <Input
        label='Name'
        placeholder='Enter your name'
        value={name}
        onChangeText={setName}
        type='text'

      />} */}

      <Input
        label='Email'
        placeholder='Enter your email'
        value={email}
        onChangeText={setEmail}
        type='email'
        Icon={<Fontisto name='email' size={20} color='#6b7280' />}
      />

      <Input
        label='Password'
        placeholder='Enter your password'
        value={password}
        onChangeText={setPassword}
        type='password'
      />

      <Button onPress={authenticate} color='primary'>
        {isAuthenticating ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
      </Button>
      {isGoogleSignInAvailable && (
        <>
          <View className='flex-row items-center justify-center gap-2 my-4'>
            <View className='flex-1 h-[1px] bg-[#9ca3af] ' />
            <Text className='text-[#9ca3af]'>or continue with</Text>
            <View className='flex-1 h-[1px] bg-[#9ca3af] ' />
          </View>
          <GoogleSigninButton
            onPress={googleSignin}
            disabled={isAuthenticating}
            style={{ marginBottom: 20 }}
          />
        </>
      )}
    </View>
  );
}
