import { validateEmail } from "@/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

type Props = {
  loading: boolean;
  onSignup: (email: string, password: string) => void;
  onBack: () => void;
};

export function SignupForm({ loading, onSignup, onBack }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const isValid = () => {
    return (
      email && password && password === confirmPassword && validateEmail(email)
    );
  };

  const handleSignup = async () => {
    onSignup(email, password);
  };

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title} variant="displaySmall">
          TrashChat
        </Text>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          label="Confirm Password"
          mode="outlined"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSignup}
          loading={loading}
          disabled={!isValid()}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Sign up
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.actions}>
        <Button onPress={onBack}>Cancel</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 36,
  },
});
