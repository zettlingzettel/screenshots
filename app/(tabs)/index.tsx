import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import { useAuth } from '@/lib/auth-context';

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  return (
    <View style={styles.view}>
      <Text>Welcome to Screenshots!</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
      </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    alignItems: 'center',
  },
});
