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
  logout: () => void;
  initializing: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
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
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (email: string, password: string) =>
          auth().signInWithEmailAndPassword(email, password),
        logout: () => {},
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
