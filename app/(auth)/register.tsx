import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    router.replace("/(chat)");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text
            style={{
              marginBottom: 16,
              textAlign: "center",
            }}
            variant="displaySmall"
          >
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
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Sign up
          </Button>
        </View>
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <Button
            onPress={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
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
});
