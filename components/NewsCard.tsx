import React from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Article } from '../utils/models';

const FALLBACK_IMAGE = "https://via.placeholder.com/400x200?text=Image+Unavailable";
export default function NewsCard({ article }: { article: Article }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const handlePress = () => {
    // FIX: Pass the WHOLE article object as a string
    router.push({
      pathname: "/article",
      params: { 
        articleData: JSON.stringify(article) // passing full data for bookmarks
      }
    });
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      activeOpacity={0.9}
      className="bg-white rounded-3xl mb-6 shadow-sm border border-slate-100 overflow-hidden"
    >
      <Image 
        // Logic: If error occurred, show fallback. Otherwise, show article image.
        source={{ uri: imageError ? FALLBACK_IMAGE : article.image }} 
        className="w-full h-48 bg-slate-200"
        resizeMode="cover"
        // IMPORTANT: This triggers when the image fails (404 or 403)
        onError={() => setImageError(true)} 
      />
      
      {/* Content Section */}
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-blue-600 text-xs font-bold uppercase tracking-wider">
            {article.source}
          </Text>
          <Text className="text-slate-400 text-xs">
            {article.date}
          </Text>
        </View>
        
        <Text className="text-slate-900 text-lg font-bold leading-6 mb-2">
          {article.title}
        </Text>
        
        <Text className="text-slate-500 text-sm leading-5" numberOfLines={2}>
          {article.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}