import { validateEmail } from "@/utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

type Props = {
  loading: boolean;
  onBack: () => void;
  onForget: (email: string) => void;
};

export function ForgetPasswordForm({ onForget, loading, onBack }: Props) {
  const [email, setEmail] = React.useState("");

  const isValid = () => {
    return email.length > 0 && validateEmail(email);
  };

  const handleRecovery = async () => {
    onForget(email);
  };

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title} variant="displaySmall">
          Recovery
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
        <Button
          disabled={!isValid()}
          mode="contained"
          loading={loading}
          onPress={handleRecovery}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Recovery
        </Button>
      </View>
      <Divider
        style={styles.divider}
      />
      <View
        style={styles.actions}
      >
        <Button onPress={onBack}>Cancel</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
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
