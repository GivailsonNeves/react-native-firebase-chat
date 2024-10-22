import { ChatItem } from "@/components";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AnimatedFAB, IconButton, Menu, Searchbar } from "react-native-paper";
import { useSession } from "../context/auth.ctx";
import { useUsersContext } from "../context";
import { User } from "@/models";
import { Chat } from "@/models/chat";

export default function IndexPage() {
  const router = useRouter();

  const { logout, user } = useSession();
  const { users } = useUsersContext();

  const usersById = useMemo(() => {
    return users.reduce((acc: { [key: string]: User }, user) => {
      acc[user.uid] = user;
      return acc;
    }, {});
  }, [users]);

  const [visible, setVisible] = React.useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [chats, setChats] = React.useState<Chat[]>([]);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .where("participants", "array-contains", user?.uid)
      .onSnapshot((querySnapshot) => {
        const _chats: Chat[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          _chats.push({
            participants: documentSnapshot.data().participants,
            id: documentSnapshot.id,
            participantId: documentSnapshot
              .data()
              .participants.find((p: string) => p !== user?.uid),
          });
        });

        setChats(_chats);
      });

    return () => subscriber();
  }, [user?.uid]);

  const _logout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  const _handleMore = () => setVisible(true);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Searchbar
            placeholder="Search"
            mode="bar"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchorPosition="bottom"
          anchor={
            <IconButton icon="dots-vertical" onPress={_handleMore} size={24} />
          }
        >
          <Menu.Item onPress={() => _logout()} title="Exit" />
        </Menu>
      </View>
      <ScrollView onScroll={onScroll} style={styles.list}>
        {chats.map((item) => (
          <ChatItem
            chat={item}
            key={item.id}
            user={usersById[item.participantId]}
            onPress={() => router.push(`/(chat)/message/${item.participantId}`)}
          />
        ))}
      </ScrollView>
      <AnimatedFAB
        icon={"pencil"}
        label={"New"}
        extended={isExtended}
        onPress={() => {
          router.push("/contacts");
        }}
        animateFrom={"right"}
        iconMode="dynamic"
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    flex: 1,
  },
  fabStyle: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
