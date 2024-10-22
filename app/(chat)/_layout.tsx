import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import { UsersProvider, useSession } from "../context";

export default function Layout() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <UsersProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="contacts"
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </UsersProvider>
  );
}
