import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

type Props = {
  onSubmit: (text: string, photo?: any) => Promise<void> | void;
};

export function MessageForm({ onSubmit }: Props) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<any>(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    await onSubmit(text, image);
    setText("");
  };

  const handleCamera = () => {
    // pickImage();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          right={
            <TextInput.Icon
              style={{
                display: text ? "flex" : "none",
              }}
              icon="close"
              onPress={() => setText("")}
            />
          }
        />
        {text.length > 0 ? (
          <IconButton icon="send" onPress={handleSubmit} />
        ) : (
          <IconButton
            icon="plus-box-multiple"
            onPress={() => {
              setActionsVisible(!actionsVisible);
            }}
          />
        )}
      </View>
      {actionsVisible && (
        <View style={styles.actions}>
          <IconButton mode="outlined" icon="camera" onPress={handleCamera} />
          <IconButton mode="outlined" icon="image" onPress={pickImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
  },
  content: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  actions: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});
