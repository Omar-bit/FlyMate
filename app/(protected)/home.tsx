import useAuth from '@/providers/AuthContext';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function Home() {
  const { logout } = useAuth();

  const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
    params: {
      query: 'new',
      // locale: 'en-US',
    },
    headers: {
      'x-rapidapi-key': '93246734bemsh6f4f35ced916076p10abf2jsnefa0fe3ff0e5',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    },
  };
  async function test() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    test();
  }, []);

  return (
    <View>
      <Text>waywaa</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
