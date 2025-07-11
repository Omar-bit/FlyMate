import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  color?: 'primary' | 'secondary';
  Icon?: React.ComponentType<{ style?: object }>;
};
export default function Button({
  children,
  onPress,
  color,
  Icon,
}: ButtonProps) {
  const backgroundColor = color === 'primary' ? '#f3f4f6' : 'transparent';
  const textColor = color === 'primary' ? '#000' : '#fff';
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${color === 'primary' ? 'bg-[#f3f4f6]' : 'bg-transparent'} p-4 rounded-lg border border-gray-600 w-full`}
    >
      <View className='flex-row items-center justify-center'>
        {Icon && <Icon style={{ marginRight: 5 }} />}
        <Text style={{ color: textColor, fontSize: 16, fontWeight: 'bold' }}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
