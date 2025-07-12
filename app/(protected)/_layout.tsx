import Navbar from '@/components/Navbar';
import useAuth from '@/providers/AuthContext';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function ProtectedLayout() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }
  return (
    <View className='flex-1 pb-24 relative'>
      <Slot />
      <Navbar />
    </View>
  );
}
