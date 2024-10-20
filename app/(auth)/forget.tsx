import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

export default function ForgetPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");

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
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Recovery
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
