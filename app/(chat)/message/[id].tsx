import { useUsersContext } from "@/app/context";
import { MessageBox, MessageForm } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Dimensions, FlatList, Keyboard, StyleSheet, View } from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { Appbar } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const PADDING_BOTTOM = 0;

const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (event) => {
      "worklet";
      height.value = Math.max(event.height, PADDING_BOTTOM);
    },
    onEnd: (e) => {
      "worklet";
      height.value = e.height;
    },
  });
  return { height };
};

export default function ForgetPage() {
  const router = useRouter();
  const { findUser } = useUsersContext();
  const { id } = useLocalSearchParams();

  const { height } = useGradualAnimation();

  const user = useMemo(() => findUser(String(id)), [id, findUser]);

  const keyboardSpacer = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : PADDING_BOTTOM,
    };
  });

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec novo texto gigante de teste",
      visualized: false,
      liked: false,
      isSender: true,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec",
      visualized: false,
      liked: true,
      isSender: false,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      text: "oi",
      visualized: false,
      liked: false,
      isSender: true,
    },
  ];

  const _goBack = () => router.back();

  return (
    <>
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          flexDirection: "column",
          backgroundColor: "green",
        }}
      >
        <Appbar.Header mode="small">
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title={user?.email.split("@")[0] || "NA"} />
        </Appbar.Header>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <MessageBox
              {...item}
              onDoubleTap={async () => {
                "worklet";
                console.log("favorite");
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: 8,
            gap: 8,
          }}
          keyboardDismissMode="on-drag"
          inverted
        />
        <MessageForm
          onSubmit={() => {
            Keyboard.dismiss();
          }}
        />
        <Animated.View style={keyboardSpacer} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
