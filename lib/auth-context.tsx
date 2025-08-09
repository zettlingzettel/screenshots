import { createContext, useContext, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from './appwrite';

type AuthContextType = {
  // user: Models.User<Models.Preferences> | null; 
  signUp: (email:string, password:string) => Promise<string | null>;
  signIn: (email:string, password:string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children}: {children: React.ReactNode} ) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);(
    null
  );

  const signUp = async (email:string, password:string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An error occurred during signup';
    }
  }


    const signIn = async (email:string, password:string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An error occurred during signin';
    }
  }

  return <AuthContext.Provider
    value={{ signUp, signIn}}
    >
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}