import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";
import { useSession } from "../context/auth.ctx";

export default function Layout() {
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
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
  );
}
