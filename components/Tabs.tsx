import React, { useState } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  containerStyle?: ViewStyle;
  tabBarStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  inactiveTabStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
  inactiveTextStyle?: TextStyle;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  variant?: 'default' | 'rounded' | 'underline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  containerStyle,
  tabBarStyle,
  activeTabStyle,
  inactiveTabStyle,
  activeTextStyle,
  inactiveTextStyle,
  activeColor,
  inactiveColor,
  backgroundColor,
  borderColor,
  variant = 'default',
  size = 'medium',
  fullWidth = true,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'rounded':
        return {
          container: 'rounded-xl overflow-hidden',
          tab: 'rounded-lg m-0.5',
        };
      case 'underline':
        return {
          container: 'bg-transparent border-b border-gray-600',
          tab: 'bg-transparent border-b-2 border-transparent',
          activeTab: 'border-b-2 border-gray-100',
        };
      default:
        return {
          container: 'rounded-lg',
          tab: '',
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return { padding: 'py-2 px-3', text: 'text-sm' };
      case 'large':
        return { padding: 'py-4 px-6', text: 'text-lg' };
      default:
        return { padding: 'py-3 px-4', text: 'text-base' };
    }
  };

  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();
  return (
    <View className='w-full' style={containerStyle}>
      <View
        className={`flex-row p-1 ${variant === 'underline' ? 'bg-transparent border-b border-gray-600' : 'bg-gray-800 rounded-lg'} ${variantClasses.container}`}
        style={[backgroundColor && { backgroundColor }, tabBarStyle]}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <TouchableOpacity
              key={tab.id}
              className={`
                items-center justify-center rounded-md mx-0.5
                ${fullWidth ? 'flex-1' : ''}
                ${sizeClasses.padding}
                ${variantClasses.tab}
                ${
                  isActive
                    ? `bg-gray-100 ${variantClasses.activeTab || ''}`
                    : 'bg-transparent'
                }
              `}
              style={[
                activeColor && isActive && { backgroundColor: activeColor },
                isActive ? activeTabStyle : inactiveTabStyle,
              ]}
              onPress={() => handleTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Text
                className={`
                  font-semibold text-center
                  ${sizeClasses.text}
                  ${isActive ? 'text-black' : 'text-gray-400'}
                `}
                style={[
                  inactiveColor && !isActive && { color: inactiveColor },
                  isActive ? activeTextStyle : inactiveTextStyle,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Tabs;
