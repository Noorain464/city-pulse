import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchNewsByCity } from '../../utils/api';
import { Article } from '../../utils/models';
import NewsCard from '../../components/NewsCard';

export default function NewsFeedScreen() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Get City from Storage when screen focuses
  useFocusEffect(
    useCallback(() => {
      const getCity = async () => {
        const storedCity = await AsyncStorage.getItem('SELECTED_CITY');
        if (storedCity) {
          setCity(storedCity);
          loadNews(storedCity);
        } else {
          // If no city found, go back to selector
          router.replace('/');
        }
      };
      getCity();
    }, [])
  );

  const loadNews = async (cityName: string) => {
    setLoading(true);
    const articles = await fetchNewsByCity(cityName);
    setNews(articles);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      {/* Custom Header */}
      <View className="px-5 py-4 flex-row justify-between items-center bg-white border-b border-slate-100 shadow-sm z-10">
        <View>
          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">Current Location</Text>
          <Text className="text-xl font-extrabold text-blue-600">{city}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.replace('/')} // Go back to selector
          className="bg-slate-100 p-2 rounded-full"
        >
          <Ionicons name="location" size={20} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563EB" />
          <Text className="text-slate-400 mt-4 text-sm font-medium">Fetching updates...</Text>
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => <NewsCard article={item} />}
          refreshing={loading}
          onRefresh={() => loadNews(city)}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}