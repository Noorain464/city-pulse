// Defines what an Article looks like across the app
export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  source: string;
}

// Helper to clean up messy API data
export const mapApiToModel = (apiData: any): Article => {
  let imageUrl = apiData.urlToImage;

  // 1. Fix: If it exists but is HTTP, force it to HTTPS
  if (imageUrl && imageUrl.startsWith('http://')) {
    imageUrl = imageUrl.replace('http://', 'https://');
  }

  // 2. Safety Check: If missing or "null", use placeholder
  if (!imageUrl || imageUrl === "null") {
    imageUrl = "https://via.placeholder.com/400x200?text=No+Image+Available";
  }
  return {
    id: apiData.url, // Using URL as unique ID
    title: apiData.title || "No Title Available",
    description: apiData.description || "Click to read more details about this story.",
    image: imageUrl,
    url: apiData.url,
    date: apiData.publishedAt ? new Date(apiData.publishedAt).toDateString() : 'Recent',
    source: apiData.source?.name || 'Unknown'
  };
};