import { LoginForm } from "@/components";
import { useRouter } from "expo-router";
import React from "react";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { useSession } from "../context/auth.ctx";
import { Snackbar } from "react-native-paper";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading } = useSession();
  const [error, setError] = React.useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      Keyboard.dismiss();
      await login(email, password);
      router.replace("/(chat)");
    } catch (error) {
      setError("Please check your email and password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginForm
        loading={loading}
        onLogin={handleLogin}
        onRegister={() => router.push("/(auth)/register")}
        onForget={() => router.push("/(auth)/forget")}
      />
      <Snackbar
        visible={!!error}
        onDismiss={() => setError("")}
        duration={3000}
        action={{
          label: "Close",
          onPress: () => setError(""),
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
});
