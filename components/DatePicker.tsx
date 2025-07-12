import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

type DatePickerProps = {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  Icon?: React.ComponentType<{ style?: object }>;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
};

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  Icon,
  mode = 'date',
  minimumDate,
  maximumDate,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (date) {
      setSelectedDate(date);
      onChange?.(date);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder;

    if (mode === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (mode === 'datetime') {
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <View className='flex flex-col gap-2 w-full'>
      {label && <Text className='text-md text-gray-500'>{label}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className='border border-gray-600 rounded-lg bg-[#1f2937] px-4 py-3'
      >
        <View className='flex-row items-center justify-between'>
          <Text
            className={`text-base ${selectedDate ? 'text-white' : 'text-[#9CA3AF]'}`}
          >
            {formatDate(selectedDate)}
          </Text>
          <View className='ml-3'>
            {Icon ? (
              <Icon style={{ color: '#6b7280' }} />
            ) : (
              <FontAwesome name='calendar' size={20} color='#6b7280' />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
