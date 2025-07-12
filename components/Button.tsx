import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  color?: 'primary' | 'secondary';
  Icon?: any;
  disabled?: boolean;
};
export default function Button({
  children,
  onPress,
  color,
  Icon,
  disabled = false,
}: ButtonProps) {
  const backgroundColor = color === 'primary' ? '#f3f4f6' : 'transparent';
  const textColor = color === 'primary' ? '#000' : '#fff';
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${color === 'primary' ? 'bg-[#f3f4f6]' : 'bg-transparent'} p-4 rounded-lg border border-gray-600 w-full ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
    >
      <View className='flex-row items-center justify-center gap-2'>
        {Icon}
        <Text style={{ color: textColor, fontSize: 16, fontWeight: 'bold' }}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
