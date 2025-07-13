import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';

const authContext = createContext<{
  user: User | null;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  isLoading: boolean;
} | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserInStorage = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    // checkUserInStorage();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      // if (user) {
      //   AsyncStorage.setItem('user', JSON.stringify(user));
      // } else {
      //   AsyncStorage.removeItem('user');
      // }
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function logout() {
    return auth.signOut();
  }

  async function updateUserProfile(displayName: string, photoURL?: string) {
    if (!auth.currentUser) {
      throw new Error('No user is currently logged in');
    }

    const updates: { displayName: string; photoURL?: string } = {
      displayName,
    };

    if (photoURL) {
      updates.photoURL = photoURL;
    }

    await updateProfile(auth.currentUser, updates);
    setUser({ ...auth.currentUser });
  }

  return (
    <authContext.Provider
      value={{ user, logout, updateUserProfile, isLoading }}
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}
export default useAuth;
