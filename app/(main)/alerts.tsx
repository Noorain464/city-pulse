import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ALERTS = [
  { id: '1', type: 'Critical', message: 'Heavy Rain Predicted: Red Alert for Downtown area. Avoid low lying areas.', time: '2h ago' },
  { id: '2', type: 'Advisory', message: 'Metro Blue Line delayed by 15 mins due to technical snag.', time: '5h ago' },
  { id: '3', type: 'Info', message: 'City Marathon tomorrow. Some roads will be diverted.', time: '1d ago' },
];

export default function AlertsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
       <View className="px-5 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-extrabold text-slate-900">Emergency Alerts</Text>
      </View>

      <FlatList
        data={ALERTS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View className={`p-5 rounded-2xl mb-4 border-l-4 shadow-sm bg-white ${
            item.type === 'Critical' ? 'border-l-red-500' : 
            item.type === 'Advisory' ? 'border-l-orange-500' : 'border-l-blue-500'
          }`}>
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-row items-center gap-2">
                <Ionicons 
                  name={item.type === 'Critical' ? "warning" : "information-circle"} 
                  size={20} 
                  color={item.type === 'Critical' ? "#EF4444" : "#F97316"} 
                />
                <Text className={`font-bold uppercase text-xs tracking-wider ${
                  item.type === 'Critical' ? 'text-red-500' : 
                  item.type === 'Advisory' ? 'text-orange-500' : 'text-blue-500'
                }`}>
                  {item.type} Update
                </Text>
              </View>
              <Text className="text-slate-400 text-xs font-medium">{item.time}</Text>
            </View>
            
            <Text className="text-slate-800 text-base leading-6 font-medium">
              {item.message}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}