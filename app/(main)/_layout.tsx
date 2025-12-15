import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Built-in icons

export default function TabLayout() {
  return (
      
      <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> 
        }} 
      />

      <Tabs.Screen 
        name="bookmarks" 
        options={{ 
          title: 'Saved', 
          tabBarIcon: ({ color }) => <Ionicons name="bookmark" size={24} color={color} />
        }} 
      />

      <Tabs.Screen 
        name="alerts" 
        options={{ 
          title: 'Alerts', 
          tabBarIcon: ({ color }) => <Ionicons name="warning" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}