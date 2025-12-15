import axios from 'axios';
import 'dotenv';
import { mapApiToModel, Article } from './models';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://newsapi.org/v2/';

export const fetchNewsByCity = async (city: string): Promise<Article[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: city,
        apiKey: API_KEY,
        sortBy: 'publishedAt',
        language: 'en',
      },
    });

    // Filter out articles with no ID/URL and map to our clean model
    console.log("API Response:", response.data);
    return response.data.articles
      .filter((item: any) => item.url)
      .map(mapApiToModel);
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};