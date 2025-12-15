import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from './models';

const KEY = 'CITY_PULSE_BOOKMARKS';

export const getBookmarks = async (): Promise<Article[]> => {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};

export const toggleBookmark = async (article: Article) => {
  try {
    const current = await getBookmarks();
    const exists = current.find(a => a.url === article.url);
    
    let updated;
    if (exists) {
      // Remove
      updated = current.filter(a => a.url !== article.url);
    } else {
      // Add
      updated = [article, ...current];
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return [];
  }
};