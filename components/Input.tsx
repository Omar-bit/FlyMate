import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
type InputProps = {
  Icon?: any;
  label?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};
export default function Input({
  Icon,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChangeText,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <View className='flex flex-col gap-2 w-full'>
      {label && <Text className='text-lg text-white'>{label}</Text>}
      <View className='relative border border-gray-600 rounded-lg bg-[#1f2937] '>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={type === 'password' && !passwordVisible}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          value={value}
          onChangeText={onChangeText}
          className='text-white text-base px-4 py-3 rounded-lg  w-full'
          placeholderTextColor='#9CA3AF'
        />
        {(Icon || type === 'password') && (
          <View className='absolute right-3 top-[50%] -translate-y-1/2'>
            {type === 'password' ? (
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                {!passwordVisible ? (
                  <FontAwesome name='eye' size={20} color='#6b7280' />
                ) : (
                  <Entypo name='eye-with-line' size={20} color='#6b7280' />
                )}
              </TouchableOpacity>
            ) : (
              Icon
            )}
          </View>
        )}
      </View>
    </View>
  );
}
