import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { toggleBookmark, getBookmarks } from '../utils/storage';
import { Article } from '../utils/models';

export default function ArticleScreen() {
  const { articleData } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // FIX: Parse the full object
  const article: Article = articleData ? JSON.parse(articleData as string) : null;

  useEffect(() => {
    if (article) {
      checkBookmarkStatus();
      setupHeader();
    }
  }, [navigation, isBookmarked]);

  const checkBookmarkStatus = async () => {
    const list = await getBookmarks();
    setIsBookmarked(list.some(a => a.url === article.url));
  };

  const handleSave = async () => {
    await toggleBookmark(article);
    setIsBookmarked(!isBookmarked);
  };

  const setupHeader = () => {
    navigation.setOptions({
      headerTitle: '', // clean header
      headerRight: () => (
        <View className="flex-row gap-4">
          <TouchableOpacity onPress={handleSave}>
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#2563EB" 
            />
          </TouchableOpacity>
        </View>
      ),
    });
  };

  if (!article) return <View className="flex-1 bg-white" />;

  return (
    <View className="flex-1 bg-white">
      <WebView 
        source={{ uri: article.url }} 
        startInLoadingState={true}
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        )}
      />
    </View>
  );
}