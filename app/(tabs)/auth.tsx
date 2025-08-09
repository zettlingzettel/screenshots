import { router, useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function AuthScreen() {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const { signUp, signIn } = useAuth();

  const handleSwitchMode = () => {
    setIsSignedUp((prevState) => !prevState);
  };

  const handleAuth = async () => {;
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
    setError('Password must be at least 6 characters long');
    return;
    }

    setError(null);

    if (isSignedUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      router.replace('/');
      }
  };

  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium"> 
          {isSignedUp ? 'Please sign up' : 'Welcome back!'}</Text>
        <TextInput 
          label="Email" 
          autoCapitalize="none" 
          autoComplete="email" 
          keyboardType="email-address" 
          placeholder="example@email.com" 
          mode="outlined"
          style={styles.input}
          onChangeText = {setEmail}
        />

            <TextInput 
          label="Password" 
          autoCapitalize="none" 
          autoComplete="password" 
          keyboardType="default" 
          mode="outlined"
          style={styles.input}
          onChangeText={setPassword}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>
        }
          <Button mode="contained" style={styles.button} onPress={handleAuth}>
            {isSignedUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>
            {isSignedUp ? 'Already have an account? Sign In.' : `Don't have an account? Sign Up`}
          </Button>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  switchModeButton: {
    marginTop: 16,
  },
});