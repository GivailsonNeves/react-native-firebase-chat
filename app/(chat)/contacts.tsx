import { User } from "@/models";
import { chatNameComposer } from "@/utils";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, List, Searchbar } from "react-native-paper";
import { useSession, useUsersContext } from "../context";

export default function ContactsPage() {
  const _goBack = () => router.back();
  const { user } = useSession();

  const { refetch, users } = useUsersContext();

  const [searchQuery, setSearchQuery] = React.useState("");

  const userList = users.filter((u) => u.uid !== user?.uid);

  const userListFiltered = userList.filter((user) =>
    searchQuery
      ? user.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  useEffect(() => {
    refetch();
  }, []);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Users" />
      </Appbar.Header>
      <View style={styles.searchBar}>
        <View style={styles.searchArea}>
          <Searchbar
            placeholder="Search"
            mode="bar"
            onChangeText={setSearchQuery}
            onClearIconPress={() => setSearchQuery("")}
            value={searchQuery}
          />
        </View>
      </View>
      <ScrollView>
        {userListFiltered?.map((participant: User) => (
          <List.Item
            key={participant.uid}
            title={participant.email}
            onPress={() =>
              router.replace({
                pathname: "/(chat)/messages/[id]",
                params: {
                  id: participant.uid,
                  chatId: chatNameComposer([participant.uid, user?.uid || ""]),
                },
              })
            }
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  searchArea: {
    flex: 1,
    paddingBottom: 8,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
