import FlightCard from '@/components/FlightCard';
import { db } from '@/config/firebaseConfig';
import useAuth from '@/providers/AuthContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

type SavedFlight = {
  _id: string;
  userId: string;
  [key: string]: any;
};

export default function Saved() {
  const [savedFlights, setSavedFlights] = useState<SavedFlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchSavedFlights = async () => {
    if (!user?.uid) return;

    try {
      const savedFlightsRef = collection(db, 'savedFlights');
      const savedFlightsQuery = query(
        savedFlightsRef,
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(savedFlightsQuery);
      const flights: SavedFlight[] = [];

      querySnapshot.forEach((doc) => {
        flights.push({
          _id: doc.id,
          ...doc.data(),
        } as SavedFlight);
      });

      setSavedFlights(flights);
    } catch (error) {
      console.error('Error fetching saved flights:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to load saved flights',
        text2: 'Please try again later',
        position: 'top',
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  const handleRefresh = () => {
    setRefreshing(true);
    fetchSavedFlights();
  };

  useEffect(() => {
    fetchSavedFlights();
  }, [user]);

  if (isLoading) {
    return (
      <View className='flex-1 bg-[#111827] justify-center items-center'>
        <ActivityIndicator size='large' color='#3b82f6' />
        <Text className='text-white mt-4'>Loading saved flights...</Text>
      </View>
    );
  }

  if (savedFlights.length === 0) {
    return (
      <View className='flex-1 bg-[#111827] justify-center items-center px-6'>
        <FontAwesome5 name='bookmark' size={64} color='#6b7280' />
        <Text className='text-white text-xl font-bold mt-6 mb-2'>
          No Saved Flights
        </Text>
        <Text className='text-gray-400 text-center leading-6'>
          Start exploring and save flights you're interested in. They'll appear
          here for easy access.
        </Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-[#111827]'>
      <View className='p-4 border-b border-gray-600'>
        <Text className='text-white text-2xl font-bold'>Saved Flights</Text>
        <Text className='text-gray-400 mt-1'>
          {savedFlights.length}{' '}
          {savedFlights.length === 1 ? 'flight' : 'flights'} saved
        </Text>
      </View>

      <FlatList
        data={savedFlights}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className='px-4'>
            <FlightCard
              showAirport
              flight={item}
              onUnsave={() =>
                setSavedFlights((prev) =>
                  prev.filter((flight) => {
                    console.log(flight._id, item._id);
                    return flight._id !== item._id;
                  })
                )
              }
              initialSaved={true}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor='#3b82f6'
            colors={['#3b82f6']}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
      />
    </View>
  );
}
