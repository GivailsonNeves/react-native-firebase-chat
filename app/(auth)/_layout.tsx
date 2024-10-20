import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="forget"
        options={{
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
