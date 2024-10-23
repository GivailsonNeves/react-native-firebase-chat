import { SignupForm } from "@/components";
import { useRouter } from "expo-router";
import React from "react";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { useSession } from "../context";
import { Snackbar } from "react-native-paper";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const { signup, loading } = useSession();

  const handleSignup = async (email: string, password: string) => {
    try {
      Keyboard.dismiss();
      await signup(email, password);
      router.replace("/(chat)");
    } catch (error) {
      setError("Please check your email and password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignupForm
        loading={loading}
        onSignup={handleSignup}
        onBack={() => router.back()}
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
