import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import { useRouter } from "expo-router";
import React from "react";
import { Keyboard, SafeAreaView, StyleSheet } from "react-native";
import { useSession } from "../context";
import { Snackbar } from "react-native-paper";

export default function ForgetPage() {
  const router = useRouter();
  const { recovery, loading } = useSession();
  const [error, setError] = React.useState("");

  const handleResetPassword = async (email: string) => {
    try {
      Keyboard.dismiss();
      await recovery(email);
      router.replace("/(auth)/login");
    } catch (error) {
      setError("Please check your email and try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ForgetPasswordForm
        onForget={handleResetPassword}
        loading={loading}
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
      >{error}</Snackbar>
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
