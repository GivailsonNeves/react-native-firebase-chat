import { useRouter } from "expo-router";
import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AnimatedFAB,
  Avatar,
  Badge,
  IconButton,
  List,
  Menu,
  Searchbar,
} from "react-native-paper";
import { useSession } from "../context/auth.ctx";

const list = [
  {
    id: 1,
    name: "John 1",
  },
  {
    id: 2,
    name: "Doe",
  },
  {
    id: 3,
    name: "Jane",
  },
  {
    id: 4,
    name: "Smith",
  },
  {
    id: 5,
    name: "Doe",
  },
  {
    id: 6,
    name: "Jane",
  },
  {
    id: 7,
    name: "Smith",
  },
  {
    id: 8,
    name: "Doe",
  },
  {
    id: 9,
    name: "Jane",
  },
  {
    id: 10,
    name: "Smith",
  },
  {
    id: 11,
    name: "Doe",
  },
  {
    id: 12,
    name: "Jane",
  },
  {
    id: 13,
    name: "Smith",
  },
  {
    id: 14,
    name: "Doe",
  },
  {
    id: 15,
    name: "Jane",
  },
  {
    id: 16,
    name: "Smith",
  },
  {
    id: 17,
    name: "Doe",
  },
  {
    id: 18,
    name: "Jane",
  },
  {
    id: 19,
    name: "Smith",
  },
  {
    id: 20,
    name: "Doe",
  },
  {
    id: 21,
    name: "Jane",
  },
  {
    id: 22,
    name: "Smith",
  },
  {
    id: 23,
    name: "Doe",
  },
  {
    id: 24,
    name: "Jane",
  },
  {
    id: 25,
    name: "Smith",
  },
  {
    id: 26,
    name: "Doe",
  },
  {
    id: 27,
    name: "Jane",
  },
  {
    id: 28,
    name: "Smith",
  },
  {
    id: 29,
    name: "Doe",
  },
  {
    id: 30,
    name: "Jane",
  },
  {
    id: 31,
    name: "Smith",
  },
  {
    id: 32,
    name: "Doe",
  },
  {
    id: 33,
    name: "Jane",
  },
  {
    id: 34,
    name: "Smith x",
  },
];

export default function IndexPage() {
  const router = useRouter();

  const { logout } = useSession();

  const [visible, setVisible] = React.useState(false);
  const [isExtended, setIsExtended] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

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
        {list.map((item) => (
          <List.Item
            onPress={() => router.push(`/(chat)/message/${item.id}`)}
            key={item.id}
            title={(props) => (
              <View
                {...props}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text>{item.name}</Text>
                <Text style={{ fontSize: 10 }}>09:30</Text>
              </View>
            )}
            // right={(props) => <List.Icon {...props} icon="chevron-right" />}
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
                label={item.name.substring(0, 1)}
              />
            )}
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
