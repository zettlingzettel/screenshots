import { Image } from 'expo-image';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.view}>
      <Text>Welcome to Screenshots!</Text>
      {/* <Link href='/login' style={styles.navButton}>
        <Text>Go to Login</Text>
      </Link> */}
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
