import React from 'react';
import '../global.css'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const CITIES = ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

export default function CitySelectorScreen() {
  const router = useRouter();

  const handleCitySelect = async (city: string) => {
    // 1. Save logic
    await AsyncStorage.setItem('SELECTED_CITY', city);
    // 2. Navigate to Tabs (Use replace so user can't go back to selector easily)
    router.replace('./(main)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" />
      <View className="flex-1 px-6 pt-10">
        
        {/* Header Section */}
        <View className="mb-10">
          <Text className="text-blue-600 font-bold text-lg uppercase tracking-widest mb-2">Welcome to</Text>
          <Text className="text-4xl font-extrabold text-slate-900">City Pulse</Text>
          <Text className="text-slate-500 mt-2 text-base">Select your location to get local news & alerts.</Text>
        </View>

        {/* Grid of Cities */}
        <View className="flex-row flex-wrap justify-between">
          {CITIES.map((city) => (
            <TouchableOpacity 
              key={city}
              onPress={() => handleCitySelect(city)}
              className="w-[48%] bg-white p-4 rounded-2xl mb-4 shadow-sm border border-slate-100 items-center justify-center py-6 active:bg-blue-50"
            >
              <Text className="text-slate-700 font-semibold text-lg">{city}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}