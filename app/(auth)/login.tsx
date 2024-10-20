import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Divider,
  IconButton,
} from "react-native-paper";
import { useSession } from "../context/auth.ctx";

export default function LoginPage() {
  const { login } = useSession();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(chat)");
    } catch (error) {
      console.error(error);
    }
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

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Login
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <IconButton
            icon="google"
            size={20}
            mode="outlined"
            onPress={handleLogin}
          />
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
              router.push("/(auth)/forget");
            }}
          >
            Recovery
          </Button>
          <Button
            onPress={() => {
              router.push("/(auth)/register");
            }}
          >
            Sign up
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
