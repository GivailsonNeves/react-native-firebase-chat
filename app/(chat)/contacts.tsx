import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Button, List, Searchbar, Text } from "react-native-paper";

export default function ContactsPage() {
  const _goBack = () => router.back();

  const [userList, setUserList] = React.useState([]);

  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5001/trashchat-2a0be/us-central1/users"
        );
        const { users } = await response.json();
        setUserList(users);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  console.log(userList);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Users" />
      </Appbar.Header>
      <View style={styles.searchBar}>
        <View
          style={{
            flex: 1,
            paddingBottom: 8,
          }}
        >
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
        {userList?.map((user: any) => (
          <List.Item
            key={user.uid}
            title={user.email}
            onPress={() => router.push(`/(chat)/message/${user.uid}`)}
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
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
