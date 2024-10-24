import { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { IconButton, MD2Colors, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAppTheme } from "@/hooks";

type Props = {
  onSubmit: (text: string, photo?: any) => Promise<void> | void;
  isSending?: boolean;
};

export function MessageForm({ onSubmit, isSending }: Props) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<any>(null);
  const [actionsVisible, setActionsVisible] = useState(false);
  const {colors} = useAppTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.4,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setActionsVisible(false);
      await onSubmit("", result.assets[0].uri);
      setText("");
      setImage(null);
    }
  };

  const handleSubmit = async () => {
    setActionsVisible(false);
    await onSubmit(text, image);
    setText("");
    setImage(null);
  };

  const handleCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.4,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setActionsVisible(false);
      await onSubmit("", result.assets[0].uri);
      setText("");
      setImage(null);
    }
  };

  return (
    <View>
      <View style={[
        styles.content,
        { backgroundColor:  colors.surfaceVariant},
        ]}>
        <TextInput
          mode="outlined"
          autoCapitalize="none"
          style={styles.input}
          placeholder="Type a message"
          value={text}
          disabled={isSending}
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
        {isSending ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        ) : (
          <>
            {text.length > 0 ? (
              <IconButton icon="send" onPress={handleSubmit} />
            ) : (
              <IconButton
                icon="paperclip"
                onPress={() => {
                  setActionsVisible(!actionsVisible);
                }}
              />
            )}
          </>
        )}
      </View>
      {actionsVisible && (
        <View style={[styles.actions, {
          backgroundColor: colors.surfaceVariant,          
        }]}>
          <IconButton mode="outlined" icon="camera" onPress={handleCamera} />
          <IconButton mode="outlined" icon="image" onPress={pickImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({  
  content: {    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  actions: {    
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
