import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth-context';

function RouteGuard( { children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    // Small delay to ensure navigation is mounted
    const timer = setTimeout(() => {
      if (!isAuth) {
        router.replace("/auth");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuth, router]);
  
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
