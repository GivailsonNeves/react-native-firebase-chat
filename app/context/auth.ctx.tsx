import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  recovery: (email: string) => void;
  logout: () => void;
  loading: boolean;
  initializing: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  recovery: () => {},
  loading: false,
  initializing: true,
});

export function useSession() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return ctx;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (_user: FirebaseAuthTypes.User | null) => {
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onAuthStateChanged(user)
    );
    return subscriber;
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
        recovery: handleResetPassword,
        loading,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
