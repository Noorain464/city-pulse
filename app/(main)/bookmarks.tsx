import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getBookmarks } from '../../utils/storage';
import { Article } from '../../utils/models';
import NewsCard from '../../components/NewsCard';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="px-5 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-extrabold text-slate-900">Saved Stories</Text>
      </View>

      {bookmarks.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <View className="bg-slate-100 p-6 rounded-full mb-4">
             {/* Placeholder Icon */}
             <Text className="text-4xl">🔖</Text>
          </View>
          <Text className="text-slate-900 font-bold text-lg mb-2">No bookmarks yet</Text>
          <Text className="text-slate-500 text-center leading-5">
            Save articles you want to read later by tapping the bookmark icon while reading.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => <NewsCard article={item} />}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
}