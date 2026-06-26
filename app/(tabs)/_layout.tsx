import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0B0C10', borderTopColor: '#1F2833', height: 60 },
        tabBarActiveTintColor: '#00FFFF',
        tabBarInactiveTintColor: '#C5C6C7',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarActiveTintColor: '#00FFFF',
          tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Games',
          tabBarActiveTintColor: '#8B5CF6',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-variant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarActiveTintColor: '#10B981',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarActiveTintColor: '#FFD700',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}