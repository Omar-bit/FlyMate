import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuth from '@/providers/AuthContext';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Profile() {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDisplayName(user?.displayName || '');
  };

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name cannot be empty');
      return;
    }

    try {
      setIsLoading(true);
      await updateUserProfile(displayName.trim());
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className='flex-1 bg-gray-900'>
      <View className='px-6 py-8'>
        <View className='flex-row items-center justify-between mb-8'>
          <Text className='text-3xl font-bold text-white'>Profile</Text>
          {!isEditing && (
            <TouchableOpacity
              onPress={handleEditProfile}
              className='p-2 rounded-lg bg-gray-800'
            >
              <Feather name='edit-2' size={20} color='#ffffff' />
            </TouchableOpacity>
          )}
        </View>

        <View className='items-center mb-8'>
          <View className='relative'>
            <View className='w-32 h-32 rounded-full border-4 border-gray-600 overflow-hidden bg-gray-800'>
              {user?.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  className='w-full h-full'
                  resizeMode='cover'
                />
              ) : (
                <View className='w-full h-full items-center justify-center'>
                  <MaterialIcons name='person' size={60} color='#9CA3AF' />
                </View>
              )}
            </View>
          </View>
        </View>

        <View className='space-y-6'>
          {isEditing ? (
            <Input
              label='Display Name'
              value={displayName}
              onChangeText={setDisplayName}
              placeholder='Enter your display name'
            />
          ) : (
            <View>
              <Text className='text-lg text-gray-300 mb-2'>Display Name</Text>
              <View className='bg-gray-800 p-4 rounded-lg border border-gray-600'>
                <Text className='text-white text-base'>
                  {user?.displayName || 'Not set'}
                </Text>
              </View>
            </View>
          )}

          <View>
            <Text className='text-lg text-gray-300 mb-2'>Email</Text>
            <View className='bg-gray-800 p-4 rounded-lg border border-gray-600'>
              <Text className='text-white text-base'>
                {user?.email || 'Not available'}
              </Text>
            </View>
          </View>

          <View>
            <Text className='text-lg text-gray-300 mb-2'>User ID</Text>
            <View className='bg-gray-800 p-4 rounded-lg border border-gray-600'>
              <Text className='text-gray-400 text-sm font-mono'>
                {user?.uid || 'Not available'}
              </Text>
            </View>
          </View>

          <View>
            <Text className='text-lg text-gray-300 mb-2'>Member Since</Text>
            <View className='bg-gray-800 p-4 rounded-lg border border-gray-600'>
              <Text className='text-white text-base'>
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : 'Not available'}
              </Text>
            </View>
          </View>
        </View>

        <View className='mt-8 space-y-4'>
          {isEditing ? (
            <View className='space-y-4'>
              <Button
                onPress={handleSaveProfile}
                color='primary'
                disabled={isLoading}
                Icon={
                  isLoading ? (
                    <ActivityIndicator size='small' color='#000' />
                  ) : (
                    <MaterialIcons name='save' size={20} color='#000' />
                  )
                }
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onPress={handleCancelEdit}>Cancel</Button>
            </View>
          ) : (
            <Button
              onPress={logout}
              Icon={<MaterialIcons name='logout' size={20} color='#fff' />}
            >
              Logout
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
