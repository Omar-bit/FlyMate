import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown as DropdownComponent } from 'react-native-element-dropdown';

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  data: DropdownItem[];
  value?: string;
  onSelectionChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  search?: boolean;
  maxHeight?: number;
  Icon?: React.ReactNode;
  disabled?: boolean;
  onSearch?: (text: string) => void;
};

const Dropdown = ({
  data,
  value,
  onSelectionChange,
  placeholder = 'Select item',
  searchPlaceholder = 'Search...',
  label,
  search = false,
  maxHeight = 300,
  Icon,
  disabled = false,
  onSearch = (text) => null,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className='flex flex-col gap-2 w-full'>
      {label && <Text className='text-md text-gray-500'>{label}</Text>}
      <View className='relative'>
        <DropdownComponent
          style={{
            height: 50,
            borderColor: isFocus ? '#3b82f6' : '#4b5563',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: '#1f2937',
            width: '100%',
          }}
          placeholderStyle={{
            fontSize: 16,
            color: '#9CA3AF',
          }}
          selectedTextStyle={{
            fontSize: 16,
            color: '#ffffff',
          }}
          inputSearchStyle={{
            height: 40,
            fontSize: 16,
            color: '#ffffff',
            backgroundColor: '#374151',
            borderRadius: 6,
            paddingHorizontal: 12,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: '#9CA3AF',
          }}
          containerStyle={{
            backgroundColor: '#1f2937',
            borderColor: '#4b5563',
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 4,
          }}
          itemTextStyle={{
            color: '#ffffff',
            fontSize: 16,
          }}
          itemContainerStyle={{
            backgroundColor: '#1f2937',
            borderBottomColor: '#374151',
            borderBottomWidth: 0.5,
          }}
          activeColor='#374151'
          data={data}
          search={search}
          maxHeight={maxHeight}
          labelField='label'
          valueField='value'
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setIsFocus(false);
            onSelectionChange(item.value);
          }}
          onChangeText={onSearch}
          disable={disabled}
          renderLeftIcon={Icon ? () => Icon as React.ReactElement : undefined}
        />
      </View>
    </View>
  );
};

export default Dropdown;
