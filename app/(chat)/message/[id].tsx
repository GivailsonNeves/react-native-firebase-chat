import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function ForgetPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const _goBack = () => router.back();
  const _handleSearch = () => console.log("Searching");
  const _handleMore = () => console.log("Shown more");
  return (
    <>
      <Appbar.Header
        mode="small"
        theme={{
          colors: {
            surface: "red",
          },
        }}
      >
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={`user ${id}`} />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
      </Appbar.Header>
      <View>
        <Text>user {id}</Text>
        <Button
          onPress={() => {
            router.back();
          }}
          title="Voltar"
        />
      </View>
    </>
  );
}
