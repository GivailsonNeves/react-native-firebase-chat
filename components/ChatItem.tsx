import { User } from "@/models";
import { Chat } from "@/models/chat";
import { View, Text } from "react-native";
import { List, Avatar, Badge } from "react-native-paper";

type Props = {
  onPress: () => void;
  chat: Chat;
  user: User;
};

export function ChatItem({ chat, onPress, user }: Props) {
  return (
    <List.Item
      onPress={onPress}
      key={chat.id}
      title={(props) => (
        <View
          {...props}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>{user?.email.split("@")[0] || "NA"}</Text>
          <Text style={{ fontSize: 10 }}>09:30</Text>
        </View>
      )}
      description={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>Last message...</Text>
          <Badge>3</Badge>
        </View>
      }
      left={(props) => (
        <Avatar.Text
          {...props}
          size={36}
          theme={{ colors: { primary: "green" } }}
          label={user?.email.substring(0, 1).toUpperCase() || "NA"}
        />
      )}
    />
  );
}
