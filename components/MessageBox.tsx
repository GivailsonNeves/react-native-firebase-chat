import { useAppTheme } from "@/hooks";
import { Message } from "@/models";
import { timeAgo } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";

export type Props = {
  message: Message;
  onDoubleTap?: () => Promise<void>;
};

export function MessageBox({
  message: { text, photoUrl, liked, isSender, createdAt },
  onDoubleTap,
}: Props) {
  const [lastPress, setLastPress] = useState(0);

  const { colors } = useAppTheme();

  const handleDoubleClick = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    if (delta < 300) {
      !isSender && onDoubleTap?.();
    }

    setLastPress(time);
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleClick} disabled={isSender}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={{
              flex: 1,
              flexDirection: !isSender ? "row" : "row-reverse",
            }}
          >
            <View
              style={[
                styles.textContent,
                {
                  backgroundColor: colors.surfaceVariant,
                },
              ]}
            >
              {liked && (
                <Ionicons
                  style={styles.icon}
                  name="heart"
                  color="red"
                  size={16}
                />
              )}
              {photoUrl && (
                <Image source={{ uri: photoUrl }} style={styles.image} />
              )}
              <Text>{text}</Text>
              <Text style={styles.messageTime}>
                {timeAgo(createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  content: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
    alignContent: "center",
  },
  textContent: {
    borderRadius: 8,
    elevation: 2,
    padding: 8,
    position: "relative",
    marginBottom: 20,
  },
  messageTime: {
    color: "#999",
    marginTop: 2,
    fontSize: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    right: -8,
    bottom: -8,
  },
});
