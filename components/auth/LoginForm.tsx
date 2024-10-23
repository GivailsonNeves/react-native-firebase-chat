import { validateEmail } from "@/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

type Props = {
  loading: boolean;
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  onForget: () => void;
};

export function LoginForm({ loading, onForget, onLogin, onRegister }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const isValid = () => {
    return email.length > 0 && password.length > 0 && validateEmail(email);
  };

  const handleLogin = async () => {
    onLogin(email, password);
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

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={!isValid()}
          loading={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.actions}>
        <Button onPress={onForget}>Recovery</Button>
        <Button onPress={onRegister}>Sign up</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
