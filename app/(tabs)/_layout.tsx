import { useEffect } from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
      <Tabs>
        {/* <Tabs.Screen name="(tabs)" options={{ headerShown: false }} /> */}
       <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      </Tabs>
  );
}