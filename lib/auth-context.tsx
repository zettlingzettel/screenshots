import { createContext, use, useContext, useState, useEffect } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from './appwrite';



type AuthContextType = {
  user: Models.User<Models.Preferences> | null; 
  isLoggedIn: boolean;
  isLoadingUser: boolean;
  signUp: (email:string, password:string) => Promise<string | null>;
  signIn: (email:string, password:string) => Promise<string | null>;
}

//  Creates an AuthContext.
// Starts as undefined so we can throw an error
//  if useAuth is used outside a provider.

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Stores the logged-in user in state 
export function AuthProvider({ children}: {children: React.ReactNode} ) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);(
    null
  );

  const [isLoadingUser, setIsLoadingUser] = useState(true);

  
// when the screen first renders
  useEffect(() => {
    // Fetch the user when the component mounts
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }

  };
  // Creates an account in Appwrite
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
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An error occurred during signin';
    }
  }

  // Makes signUp and signIn available to any component wrapped in AuthProvider.
  return <AuthContext.Provider
    value={{ user, isLoadingUser, signUp, signIn }}
  >
    {children}
  </AuthContext.Provider>
}

// Allows you to use const { signUp, signIn } = useAuth(); anywhere in the app.
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}