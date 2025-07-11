import useAuth from '@/providers/AuthContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function Home() {
  const { logout } = useAuth();
  return (
    <View>
      <Text>waywaa</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
