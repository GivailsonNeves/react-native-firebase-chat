import { useSession, useUsersContext } from "@/app/context";
import { MessageBox, MessageForm } from "@/components";
import { useChatMessage } from "@/hooks/useChatMessage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { Appbar, FAB } from "react-native-paper";
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

  const listRef = useRef<FlatList>(null);

  const { user } = useSession();
  const { findUser } = useUsersContext();
  const { id, chatId } = useLocalSearchParams();

  const [isExtended, setIsExtended] = useState(false);

  const { messages, sendMessage } = useChatMessage({
    chatId: String(chatId),
    userId: user?.uid || "",
  });

  const { height } = useGradualAnimation();

  const recipe = useMemo(() => {
    return findUser(String(id));
  }, [id, findUser]);

  const keyboardSpacer = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : PADDING_BOTTOM,
    };
  });

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition > 200);
  };

  const handleScrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

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
          <Appbar.Content title={recipe?.email.split("@")[0] || "NA"} />
        </Appbar.Header>
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBox
              message={item}
              onDoubleTap={async () => {
                "worklet";
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: 8,
            gap: 8,
          }}
          onScroll={onScroll}
          keyboardDismissMode="on-drag"
          inverted
        />
        <FAB
          icon="chevron-down"
          style={styles.fab}
          size="small"
          visible={isExtended}
          onPress={handleScrollToTop}
        />
        <MessageForm
          onSubmit={(text, photo) => {
            sendMessage({
              text,
              photoUrl: photo,
            });
            Keyboard.dismiss();
          }}
        />
        <Animated.View style={keyboardSpacer} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 90,
  },
});
