import { useAppTheme } from "@/hooks";
import { Message, User } from "@/models";
import { Chat } from "@/models/chat";
import { extractNameFromEmail, firstLetter, timeAgo } from "@/utils";
import { View, Text, StyleSheet } from "react-native";
import { List, Avatar, Icon } from "react-native-paper";

type Props = {
  onPress: () => void;
  chat: Chat;
  user: User;
  lastMessage: Message;
};

export function ChatItem({ chat, onPress, user, lastMessage }: Props) {
  const theme = useAppTheme();
  return (
    <List.Item
      onPress={onPress}
      key={chat.id}
      title={(props) => (
        <View {...props} style={styles.textContainer}>
          <Text>{extractNameFromEmail(user?.email)}</Text>
          <Text style={styles.timeText}>{timeAgo(lastMessage?.createdAt)}</Text>
        </View>
      )}
      description={
        <View style={styles.lastMessageContainer}>
          <Text>{lastMessage?.text.substring(0, 10)}...</Text>
          <Icon source="chevron-right" size={20} />
        </View>
      }
      left={(props) => (
        <Avatar.Text
          {...props}
          size={36}
          color={theme.colors.surface}
          label={firstLetter(user?.email)}
        />
      )}
    />
  );
}


const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  timeText: { fontSize: 10 },
  lastMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});