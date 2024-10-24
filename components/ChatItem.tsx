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
        <View>
          <Text style={{flex:1}}>{lastMessage?.text.substring(0, 10)}...</Text>          
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
      right={(props) => (
        <Icon {...props} source="chevron-right" size={40} />
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
});