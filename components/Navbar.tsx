import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Navbar() {
  const router = useRouter();
  const activeScreen = usePathname();
  console.log(activeScreen);

  return (
    <BlurView
      intensity={80}
      tint='dark'
      className='border border-gray-400  h-20  mx-auto ml-[5%] w-[90%]   absolute z-50 bottom-2'
      style={{ borderRadius: 25, overflow: 'hidden' }}
    >
      <View className='flex-1 flex-row items-center justify-between px-6 bg-[#111827ec] '>
        {[
          {
            label: 'Home',
            path: '/home',
            // icon: <Entypo name='home' size={24} color='black' />,
            icon: { family: Entypo, name: 'home' },
          },
          {
            label: 'Saved',
            path: '/saved',
            // icon: <FontAwesome5 name='bookmark' size={24} color='black' />,
            icon: { family: FontAwesome5, name: 'bookmark' },
          },
          {
            label: 'Profile',
            path: '/profile',
            // icon: <FontAwesome5 name='bookmark' size={24} color='black' />,
            icon: { family: AntDesign, name: 'user' },
          },
        ].map((item, index) => (
          <TouchableOpacity
            className='flex-1 items-center'
            key={index}
            onPress={() => {
              //@ts-ignore
              router.push(item.path);
            }}
          >
            {React.createElement(item.icon.family, {
              name: item.icon.name,
              size: 24,
              color: activeScreen === item.path ? '#2563eb' : 'white',
            })}
            <Text
              className={`text-white text-lg font-semibold ${
                activeScreen === item.path ? 'text-[#2563eb]' : 'text-white'
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
}
