import { db } from '@/config/firebaseConfig';
import useAuth from '@/providers/AuthContext';
import { formatDate, formatDuration, formatTime } from '@/utils/time';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from './Button';

function getStopsText(stopCount: number): string {
  if (stopCount === 0) return 'Direct';
  if (stopCount === 1) return '1 Stop';
  return `${stopCount} Stops`;
}
export default function FlightCard({
  flight,
  onUnsave,
  initialSaved = false,
  showAirport = false,
}: {
  flight: any;
  onUnsave?: () => void;
  initialSaved?: boolean;
  showAirport?: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const leg = flight.legs[0];
  const tags = flight.tags || [];
  const { user } = useAuth();
  // console.log(flight);

  async function handleSave() {
    try {
      const docRef = await addDoc(collection(db, 'savedFlights'), {
        userId: user?.uid,
        ...flight,
      });
      flight._id = docRef.id;
      Toast.show({
        type: 'success',
        text1: 'Flight saved successfully!',
        position: 'top',
      });
      setSaved(true);
    } catch (error) {
      console.error('Error saving flight:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to save flight. Please try again.',
        position: 'top',
      });
    }
  }
  async function handleUnsave() {
    try {
      await deleteDoc(doc(db, 'savedFlights', flight._id));
      Toast.show({
        type: 'info',
        text1: 'Flight unsaved successfully!',
        position: 'top',
      });
      setSaved(false);
      if (onUnsave) {
        console.log('Calling onUnsave callback');
        onUnsave();
      }
    } catch (error) {
      console.error('Error unsaving flight:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to unsave flight. Please try again.',
        position: 'top',
      });
    }
  }
  async function getSavedStatus() {
    const savedFlightsRef = collection(db, 'savedFlights');

    const savedFlightsQuery = query(
      savedFlightsRef,
      where('userId', '==', user?.uid),
      where('id', '==', flight.id)
    );
    const savedFlights = await getDocs(savedFlightsQuery);
    savedFlights.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      if (doc.exists()) {
        setSaved(true);
        flight._id = doc.id;
      } else {
        setSaved(false);
      }
    });
  }
  useEffect(() => {
    if (!initialSaved) {
      getSavedStatus();
    }
  }, [initialSaved]);

  return (
    <View className='bg-[#1f2937] p-4 rounded-lg border border-gray-600 mb-3'>
      {/* Tags */}
      {tags.length > 0 && (
        <View className='flex-row flex-wrap mb-2'>
          {tags.map((tag: string, index: number) => (
            <View
              key={index}
              className='bg-blue-600 px-2 py-1 rounded mr-2 mb-1'
            >
              <Text className='text-white text-xs font-medium capitalize'>
                {tag.replace('_', ' ')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Flight details */}
      <View className='flex-row justify-between items-center mb-3'>
        <View className='flex-1'>
          {showAirport && (
            <Text className='text-white  text-sm font-bold'>
              {leg.origin.name}
            </Text>
          )}
          <Text className='text-white text-lg font-bold'>
            {formatTime(leg.departure)}
          </Text>
          <Text className='text-gray-400 text-sm'>
            {formatDate(leg.departure)}
          </Text>
        </View>

        <View className='flex-1 items-center'>
          <Text className='text-gray-400 text-sm'>
            {formatDuration(leg.durationInMinutes)}
          </Text>
          <View className='flex-row items-center'>
            <View className='w-2 h-2 bg-gray-400 rounded-full'></View>
            <View className='flex-1 h-0.5 bg-gray-400 mx-2'></View>
            <FontAwesome5 name='plane' size={12} color='gray' />
            <View className='flex-1 h-0.5 bg-gray-400 mx-2'></View>
            <View className='w-2 h-2 bg-gray-400 rounded-full'></View>
          </View>
          <Text className='text-gray-400 text-xs mt-1'>
            {getStopsText(leg.stopCount)}
          </Text>
        </View>

        <View className='flex-1 items-end'>
          {showAirport && (
            <Text className='text-white text-sm text-right font-bold'>
              {leg.destination.name}
            </Text>
          )}
          <Text className='text-white text-lg font-bold'>
            {formatTime(leg.arrival)}
          </Text>
          <Text className='text-gray-400 text-sm'>
            {formatDate(leg.arrival)}
          </Text>
        </View>
      </View>

      {/* Price and booking */}
      <View className='flex-row justify-between items-center pt-3 border-t border-gray-600'>
        <View>
          <Text className='text-white text-2xl font-bold'>
            {flight.price.formatted}
          </Text>
          <Text className='text-gray-400 text-sm'>per person</Text>
        </View>
        <View className=''>
          <Button
            Icon={
              !saved ? (
                <FontAwesome5 name='bookmark' size={16} color='#111827' />
              ) : (
                <FontAwesome name='bookmark' size={16} color='#111827' />
              )
            }
            color='primary'
            onPress={!saved ? handleSave : handleUnsave}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        </View>
      </View>
    </View>
  );
}
