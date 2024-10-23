import { User } from "@/models";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type UsersContextType = {
  users: User[];
  loading: Boolean;
  refetch: () => void;
  findUser: (uid: string) => User | null;
};

export const UsersContext = createContext<UsersContextType>({
  users: [],
  loading: true,
  refetch: () => {},
  findUser: () => null,
});

export function useUsersContext() {
  const ctx = useContext(UsersContext);

  if (!ctx) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }

  return ctx;
}

export function UsersProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { users } = await response.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findUser = (uid: string) => {
    return users.find((user) => user.uid === uid) || null;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      loadData();
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        refetch: loadData,
        findUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
